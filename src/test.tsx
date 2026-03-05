import { createElement } from './createElement';

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
