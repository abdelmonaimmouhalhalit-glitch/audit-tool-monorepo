const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        vanta: {
          dark: '#141414',        // La Sidebar noire
          purple: '#5025ff',      // Le violet Vanta (Boutons, Liens actifs)
          'purple-light': '#eef2ff', // Fond des icônes violettes
          green: '#10b981',       // Succès / Progress bars
          red: '#ef4444',         // Echecs
          text: '#111827',        // Texte principal (presque noir)
          subtext: '#6b7280',     // Texte secondaire (gris)
          border: '#e5e7eb',      // Bordures fines grises
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Vanta utilise une police très proche d'Inter
      }
    },
  },
  plugins: [],
};