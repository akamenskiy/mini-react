import { createElement } from './createElement';
import { render } from './renderer';

const element = createElement(
  'div',
  { id: 'container', className: 'app' },
  createElement('h1', { className: 'title' }, 'Hello, mini-React!'),
  createElement('p', null, 'This is rendered to real DOM!'),
  createElement('button', null, 'Click me'),
);

render(element, document.getElementById('root')!);

export { createElement, render, createElement as jsx };
