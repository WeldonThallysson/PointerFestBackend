import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  sourcemap: true,
  clean: true,
  target: 'es6',
  format: ['cjs'],
  loader: {
    '.html': 'text'
  }
});
