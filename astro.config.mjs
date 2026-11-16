// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Update to your final URL (custom domain or https://<user>.github.io)
  site: 'https://gludescher.github.io',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});