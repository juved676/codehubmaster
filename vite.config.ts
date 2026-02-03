import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime"],
    esbuildOptions: {
      jsx: 'automatic',
    },
  },
  build: {
    cssMinify: true,
    cssCodeSplit: true, // Split CSS into smaller chunks
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Aggressive code splitting for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          'router': ['react-router-dom'],
          'ui-core': ['@radix-ui/react-slot', '@radix-ui/react-tooltip', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'ui-dialogs': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover'],
          'ui-forms': ['@radix-ui/react-checkbox', '@radix-ui/react-label', '@radix-ui/react-select', '@radix-ui/react-switch'],
          'query': ['@tanstack/react-query'],
          'supabase': ['@supabase/supabase-js'],
          'icons': ['lucide-react'],
        },
        // Use content hashing for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Generate source maps for debugging in production
    sourcemap: false,
  },
  // CSS optimization
  css: {
    devSourcemap: false,
  },
}));
