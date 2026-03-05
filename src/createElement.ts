import type { VNode } from './types';

const createTextElement = (text: string | number): VNode => ({
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: text.toString(),
    children: [],
  },
});

export const createElement = (
  type: string | ((props: any) => VNode),
  props: Record<string, any> | null,
  ...children: (VNode | string | number | boolean | null | undefined)[]
): VNode => ({
  type,
  props: {
    ...props,
    children: children
      .flat(Infinity)
      .filter(child => child != null && child !== false && child !== true)
      .map(child =>
        typeof child === 'object' ? child : createTextElement(child),
      ),
  },
});
