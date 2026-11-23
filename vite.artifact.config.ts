// Build spécial « aperçu » : tout le site dans un seul fichier HTML (formulaire en mode test).
// Usage : VITE_STORAGE_PROVIDER=mock npx vite build -c vite.artifact.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { viteSingleFile } from 'vite-plugin-singlefile';

const theme = process.env.VITE_THEME === 'originale' ? 'originale' : 'nouvelle';

export default defineConfig({
  resolve: {
    alias: { '@palette': fileURLToPath(new URL(`./src/themes/${theme}.css`, import.meta.url)) },
  },
  plugins: [
    react(),
    tailwindcss(),
    { name: 'site-url', transformIndexHtml: (html: string) => html.replaceAll('__SITE_URL__', 'https://arnica-lancement.netlify.app') },
    viteSingleFile(),
  ],
  build: { outDir: 'dist-preview', target: 'es2020', assetsInlineLimit: 100_000_000 },
});
