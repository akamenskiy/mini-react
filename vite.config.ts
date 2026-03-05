import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxFactory: 'createElement',
    jsxInject: `import { createElement } from '/src/createElement'`,
  },
});
