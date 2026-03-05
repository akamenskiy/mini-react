import { createElement } from './createElement';
import { createFiberTree } from './fiber';
import { render } from './renderer';

const element = createElement(
  'div',
  null,
  'Hello',
  createElement('span', null, 'World'),
  42,
  null,
  false,
);

console.log(JSON.stringify(element, null, 2));

const vnode = createElement(
  'div',
  null,
  createElement('h1', null, 'Hello'),
  createElement('p', null, 'World'),
);
const fiber = createFiberTree(vnode);
console.log(fiber);

render(element, document.getElementById('root')!);

export { createElement, render, createElement as jsx };
