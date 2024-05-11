import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/


import replace from '@rollup/plugin-replace';

export default defineConfig({
  plugins: [
    replace({
      'process.env.REACT_APP_WEATHER_API_KEY': JSON.stringify(process.env.REACT_APP_WEATHER_API_KEY),
    }),
    react()
  ],
});
