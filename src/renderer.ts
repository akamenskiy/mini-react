import {
  getCurrentRoot,
  setWipRoot,
  setNextUnitOfWork,
  getDeletions,
  setDeletions,
  getWipRoot,
  setCurrentRoot,
} from './reconciler';
import { EffectTag } from './types';
import type { Fiber, VNode } from './types';

export function render(element: VNode, container: HTMLElement) {
  const newWipRoot: Fiber = {
    type: 'ROOT',
    props: {
      children: [element],
    },
    stateNode: container,
    alternate: getCurrentRoot(),
    child: null,
    sibling: null,
    parent: null,
    effectTag: null,
  };

  setWipRoot(newWipRoot);
  setNextUnitOfWork(newWipRoot);

  const fiber = newWipRoot.props.children[0];
  buildFiberTree(newWipRoot, [fiber]);

  commitRoot();
}

function buildFiberTree(parentFiber: Fiber, elements: VNode[]): void {
  let prevSibling: Fiber | null = null;

  elements.forEach((element, index) => {
    const newFiber: Fiber = {
      type: element.type,
      props: element.props,
      stateNode: null,
      parent: parentFiber,
      child: null,
      sibling: null,
      alternate: null,
      effectTag: EffectTag.PLACEMENT,
    };

    if (element.type !== 'ROOT') {
      newFiber.stateNode = createDOMElement(newFiber);
    }

    if (element.props.children && element.props.children.length > 0) {
      buildFiberTree(newFiber, element.props.children);
    }

    if (index === 0) {
      parentFiber.child = newFiber;
    } else if (prevSibling) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
  });
}

const updateDOMProperties = (
  dom: HTMLElement | Text,
  prevProps: any,
  nextProps: any,
) => {
  const isProperty = (name: string) =>
    name !== 'children' &&
    name !== 'key' &&
    name !== 'ref' &&
    !name.startsWith('on');

  for (const name in prevProps) {
    if (isProperty(name) && !(name in nextProps)) {
      (dom as any)[name] = '';
    }
  }

  for (const name in nextProps) {
    if (isProperty(name) && nextProps[name] !== prevProps[name]) {
      (dom as any)[name] = nextProps[name];
    }
  }
};

const createDOMElement = (fiber: Fiber): HTMLElement | Text => {
  if (fiber.type === 'TEXT_ELEMENT') {
    return document.createTextNode(fiber.props.nodeValue || '');
  }

  const element = document.createElement(fiber.type as string);

  updateDOMProperties(element, {}, fiber.props);

  return element;
};

const commitWork = (fiber: Fiber | null): void => {
  if (!fiber) return;

  let domParentFiber = fiber.parent;
  while (domParentFiber && !domParentFiber.stateNode) {
    domParentFiber = domParentFiber.parent;
  }

  if (!domParentFiber || !domParentFiber.stateNode) {
    throw new Error('No DOM parent found');
  }

  const domParent = domParentFiber.stateNode as HTMLElement;

  if (fiber.effectTag === EffectTag.PLACEMENT && fiber.stateNode) {
    domParent.appendChild(fiber.stateNode);
  } else if (fiber.effectTag === EffectTag.UPDATE && fiber.stateNode) {
    updateDOMProperties(fiber.stateNode, fiber.alternate!.props, fiber.props);
  } else if (fiber.effectTag === EffectTag.DELETION && fiber.stateNode) {
    domParent.removeChild(fiber.stateNode);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
};

const commitRoot = (): void => {
  const deletions = getDeletions();
  deletions.forEach(commitWork);
  setDeletions([]);

  const wipRoot = getWipRoot();
  commitWork(wipRoot!.child);

  setCurrentRoot(wipRoot);
  setWipRoot(null);
};
