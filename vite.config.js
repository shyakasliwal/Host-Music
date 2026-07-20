import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const rawRemoteUrl =
    env.VITE_MFE_REMOTE_URL || 'http://localhost:5001/assets/remoteEntry.js';
  // Accept either the full remoteEntry.js URL or just the MFE's site root.
  const remoteUrl = rawRemoteUrl.endsWith('.js')
    ? rawRemoteUrl
    : `${rawRemoteUrl.replace(/\/$/, '')}/assets/remoteEntry.js`;

  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'host',
        remotes: {
          musicLibrary: remoteUrl,
        },
        shared: ['react', 'react-dom', '@tanstack/react-query'],
      }),
    ],
    optimizeDeps: {
      exclude: ['musicLibrary/MusicLibrary'],
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 5000,
      strictPort: true,
    },
    preview: {
      port: 5000,
      strictPort: true,
    },
  };
});
