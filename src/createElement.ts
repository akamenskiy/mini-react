import type { VNode } from './types';

export const createElement = (
  type: string,
  props: Record<string, any> | null,
  ...children: (VNode | string | number)[]
): VNode => ({
  type,
  props: {
    ...props,
    children,
  },
});
