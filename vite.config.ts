import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@slices': path.resolve(__dirname, './src/app/slices'),
      '@thunks': path.resolve(__dirname, './src/app/thunks'),
      '@components': path.resolve(__dirname, './src/components'),
      '@containers': path.resolve(__dirname, './src/containers'),
    },
  },
  plugins: [react()],
});
