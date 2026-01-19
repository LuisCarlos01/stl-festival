import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Tailwind base styles já aplicados
    }),
  ],
  output: 'static', // SSG (Static Site Generation)
  build: {
    inlineStylesheets: 'auto',
  },
});
