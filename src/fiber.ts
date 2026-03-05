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

  const children = vnode.props.children;

  if (children && children.length > 0) {
    let previousSibling: Fiber | null = null;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      if (typeof child === 'string' || typeof child === 'number') {
        continue;
      }

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
