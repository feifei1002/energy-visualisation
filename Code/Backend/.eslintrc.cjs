module.exports = {
  root: true,
  env: {
    node: true, // Add Node.js environment
    es2020: true,
  },
  extends: [
    'eslint:recommended',
  ],
  ignorePatterns: ['dist'], // Remove .eslintrc.cjs if not needed
  parserOptions: {
    ecmaVersion: 2020, // Specify the appropriate ECMAScript version
    sourceType: 'module',
  },
  rules: {
    // Add custom rules for your backend code
    // Example: 'no-console': 'off' to allow console.log
  },
};
