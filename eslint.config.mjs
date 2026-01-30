// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      // Allow console.error and console.warn, but not console.log
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      // Vue-specific rules
      'vue/multi-word-component-names': 'off', // Allow single-word component names
      'vue/no-multiple-template-root': 'off', // Vue 3 allows multiple root elements
      
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn', // Warn but don't error on 'any'
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
    }
  }
)
