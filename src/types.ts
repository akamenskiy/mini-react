export type VNode = {
  type: string | FunctionComponent;
  props: {
    [key: string]: any;
    nodeValue?: string;
    children: VNode[];
  };
};

export type EffectTag = 'PLACEMENT' | 'UPDATE' | 'DELETION';

export type FunctionComponent = (props: any) => VNode;

export type FiberType = string | FunctionComponent;

export type Fiber = {
  type: FiberType;
  props: {
    [key: string]: any;
  };
  stateNode: globalThis.HTMLElement | globalThis.Text | null;
  child: Fiber | null;
  sibling: Fiber | null;
  parent: Fiber | null;
  alternate: Fiber | null;
  effectTag: EffectTag | null;
};
