import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Enforce port 5173
    open: true, // Automatically open the browser
    proxy: {
      '/chatbot/api/': {
        target: 'http://localhost:8000/chatbot/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chatbot\/api/, '/chatbot'),
      },
    },
  },
});