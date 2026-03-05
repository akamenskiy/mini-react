import type { Fiber, FiberType, VNode } from './types';

export const createFiber = (
  type: FiberType,
  props: Record<string, any>,
): Fiber => ({
  type,
  props,
  stateNode: null,
  child: null,
  sibling: null,
  parent: null,
  alternate: null,
  effectTag: null,
});

export const createFiberTree = (
  vnode: VNode,
  parent: Fiber | null = null,
): Fiber => {
  const fiber = createFiber(vnode.type, vnode.props);
  fiber.parent = parent;

  if (vnode.type === 'TEXT_ELEMENT') {
    return fiber;
  }

  const children = vnode.props.children;

  if (children && children.length > 0) {
    let previousSibling: Fiber | null = null;

    for (const child of children) {
      const childFiber = createFiberTree(child, fiber);

      if (previousSibling === null) {
        fiber.child = childFiber;
      } else {
        previousSibling.sibling = childFiber;
      }
      previousSibling = childFiber;
    }
  }

  return fiber;
};
