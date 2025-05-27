// vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
// });
// import tailwindcss from 'tailwindcss';
// import autoprefixer from 'autoprefixer';

// export default {
//   plugins: [tailwindcss(), autoprefixer()],
// };

import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
};
