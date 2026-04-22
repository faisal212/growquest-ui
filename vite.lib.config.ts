import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/index.ts', 'src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['**/*.stories.*', '**/*.test.*', '**/*.spec.*'],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom'],
    },
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
  },
})
