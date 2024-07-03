import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: 
    { globals: globals.browser },
  },
    // Ignorer des fichiers et répertoires spécifiques
  {
    ignores: [
      'node_modules/',
      '**/*.min.js',
      'configurations/',
      'cypress/',
      'test/',
      'public/',
      'views/**/*.ejs',
      '*.log',
      '/dist/',
      '/build/',
      'assets/**',
      'controllers/movies.js',
      'cypress.config.js',
      'index.js',
      'models/user.js',
      'services/jwt.js',
    ]
  },
    
  pluginJs.configs.recommended,
];