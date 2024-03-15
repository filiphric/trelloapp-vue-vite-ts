import { defineConfig } from "cypress";

export default defineConfig({
  
  projectId: 'm2fvqo',
  e2e: {
    specPattern: "**/e2e/*/*.spec.ts", 
    baseUrl: 'http://localhost:3000',
    reporter: 'spec',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    
  },
});
