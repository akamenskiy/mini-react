import { createElement } from './createElement';
import { createFiberTree } from './fiber';

const App = () => {
  return (
    <div className="app">
      <h1>Hello from JSX!</h1>
      <p>This is {1 + 1}</p>
      <button onClick={() => console.log('clicked')}>Click me</button>
    </div>
  );
};

console.log(JSON.stringify(App(), null, 2));

const element = (
  <div>
    <h1>Hello</h1>
    <p>Text: {42}</p>
  </div>
);

const fiber = createFiberTree(element);
console.log('Fiber tree:', fiber);

console.log(
  JSON.stringify(
    fiber,
    (key, value) => {
      if (key === 'parent' || key === 'alternate') return '[Circular]';
      return value;
    },
    2,
  ),
);
