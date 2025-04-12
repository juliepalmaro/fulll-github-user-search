import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config'; // 👈 pour avoir les types reconnus

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		exclude: [...configDefaults.exclude, 'e2e/**'],
		setupFiles: './src/tests/setup.ts',
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'html', 'lcov'],
		},
	},
});
