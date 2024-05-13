import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        minify: false,
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'helloworld',
            formats: ['es'],
            fileName: () => `main.mjs`
        },
        outDir: 'out',
        emptyOutDir: true,
        rollupOptions: {
            // TODO: We should find a way to use the same instance of react as the electron app.
            external: ['weaver'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                },
                paths: {
                    weaver: process.env.BUILD_ENVIRONMENT === 'true' ? '/api/weaver.js' : 'weaver'
                },
                assetFileNames(chunkInfo) {
                    if (chunkInfo.name === 'style.css') return 'styles.css';
                    return chunkInfo.name as string;
                }
            }
        },
        target: 'esnext'
    },
    define: {
        'process': 'weaver.process',
    },
    plugins: [
        react()
    ],
});
