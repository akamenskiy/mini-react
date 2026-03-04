import type { Fiber, FiberType, VNode } from './types';

export const createFiber = (type: FiberType, props: Record<string, any>): Fiber => ({
  type,
  props,
  stateNode: null,
  child: null,
  sibling: null,
  parent: null,
  alternate: null,
  effectTag: null,
});

export const createFiberTree = (vnode: VNode, parent: Fiber | null = null): Fiber => {
  const fiber = createFiber(vnode.type, vnode.props);
  fiber.parent = parent;
};
