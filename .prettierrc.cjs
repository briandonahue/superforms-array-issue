/* Required for Svelte formatting - can't figure out how to use ESLint as default formatter */
module.exports = {
  "eslintIntegration": true,
  "useTabs": false,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false,
  "printWidth": 100,
  "overrides": [
    {
      "files": "*.svelte",
      "options": {
        "parser": "svelte"
      }
    }
  ]
}