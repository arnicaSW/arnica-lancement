import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig(({ mode }) => {
  // URL publique du site, injectée dans les balises canonical / Open Graph de index.html
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = (env.VITE_SITE_URL || 'https://rassusante.netlify.app').replace(/\/$/, '');
  // Palette de couleurs : VITE_THEME=nouvelle (palette de l'équipe) ou originale
  const theme = env.VITE_THEME === 'originale' ? 'originale' : 'nouvelle';

  return {
    resolve: {
      alias: { '@palette': fileURLToPath(new URL(`./src/themes/${theme}.css`, import.meta.url)) },
    },
    plugins: [
      react(),
      tailwindcss(),
      { name: 'site-url', transformIndexHtml: (html: string) => html.replaceAll('__SITE_URL__', siteUrl) },
    ],
    build: {
      target: 'es2020',
      rollupOptions: {
        output: {
          // Sépare les grosses librairies pour un meilleur cache navigateur
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  };
});
