import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    '.': 'src/index.tsx',
  },
  banner: {
    js: "'use client';",
  },
  splitting: true,
  injectStyle: true,
  platform: 'browser',
  treeshake: true,
  target: 'es2022',
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react'],
  dts: true,
});
