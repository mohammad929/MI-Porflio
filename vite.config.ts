import {defineConfig} from 'vite';

export default defineConfig({
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== 'true',
    port: 3000,
    host: '0.0.0.0',
  },
});
