import type { Fiber } from './types';

export let currentRoot: Fiber | null = null;
export let wipRoot: Fiber | null = null;
export let nextUnitOfWork: Fiber | null = null;
export let deletions: Fiber[] = [];
