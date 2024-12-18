import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import gzipPlugin from 'rollup-plugin-gzip';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      manifest: {
        name: 'Savior dinas lingkugan hidup kota surabaya',
        short_name: 'Savior',
        description: 'situs ini merupakan situs untuk menukarkan sampah menjadi uang digital yang dapat digunakan untuk membeli kebutuhan pokok di toko kami. Savior bekerja sama dengan Dinas Lingkungan hidup kota Surabaya',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
      },
    }),
    gzipPlugin(),
    viteImagemin({
      gifsicle: { interlaced: true },
      optipng: { optimizationLevel: 5 },
      svgo: { plugins: [{ removeViewBox: false }] },
      mozjpeg: { quality: 40 }, // Compress JPEG images
      pngquant: { quality: [0.45, 0.60] }, // Compress PNG images
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Customize the chunk size warning
  },
  server: {
    port: 8000,
  },
});
