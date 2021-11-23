module.exports = {
    globals: {
      __PATH_PREFIX__: true,
    },
    extends: `react-app`,
    "plugins": ["simple-import-sort"],
    "rules": {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error"
      }
  }