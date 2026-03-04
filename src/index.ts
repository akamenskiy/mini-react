import { createElement } from './createElement';

const element = createElement(
  'div',
  { id: 'root', className: 'container' },
  createElement('h1', null, 'Hello'),
  createElement('p', { style: 'color: blue' }, 'World')
);

console.log(JSON.stringify(element, null, 2));
