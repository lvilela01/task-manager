import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'], // Ponto de entrada
  outDir: 'build',         // Pasta de saída
  format: ['esm'],         // Força compilação em ES Modules (.js)
  clean: true,             // Limpa a pasta build antes de cada compilação
  outExtension() {
    return {
      js: '.js',           // Garante a extensão .js em vez de .cjs
    };
  },
});
