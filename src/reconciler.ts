import type { Fiber } from './types';

let currentRoot: Fiber | null = null;
let wipRoot: Fiber | null = null;
let nextUnitOfWork: Fiber | null = null;
let deletions: Fiber[] = [];

export const getCurrentRoot = () => currentRoot;
export const getWipRoot = () => wipRoot;
export const getNextUnitOfWork = () => nextUnitOfWork;
export const getDeletions = () => deletions;

export const setCurrentRoot = (fiber: Fiber | null) => {
  currentRoot = fiber;
};

export const setWipRoot = (fiber: Fiber | null) => {
  wipRoot = fiber;
};

export const setNextUnitOfWork = (fiber: Fiber | null) => {
  nextUnitOfWork = fiber;
};

export const setDeletions = (fibers: Fiber[]) => {
  deletions = fibers;
};
