import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],

	// Cache directory to root node modules
	cacheDir: '../node_modules/.vite-client',
});
