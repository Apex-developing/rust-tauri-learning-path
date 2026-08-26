import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'icon-192.svg', 'icon-512.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2,webmanifest}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        sourcemap: false,
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//]
      },
      manifest: {
        id: './',
        scope: './',
        start_url: './',
        name: 'Rust & Tauri Learning Path',
        short_name: 'RustTauriCourse',
        description: 'Learn programming fundamentals, Rust, TypeScript, and Tauri v2.',
        theme_color: '#07111d',
        background_color: '#111827',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone'],
        orientation: 'portrait',
        categories: ['education', 'productivity'],
        icons: [
          {
            src: './icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: './icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: './'
});
