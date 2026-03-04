import { createElement } from './createElement';
import { createFiberTree } from './fiber';
import { render } from './renderer';

const element = createElement(
  'div',
  { id: 'root', className: 'container' },
  createElement('h1', null, 'Hello'),
  createElement('p', { style: 'color: blue' }, 'World'),
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
