module.exports = {
  extends: "stylelint-config-recommended",
  rules: {
    "selector-class-pattern": /^[a-zA-Z-]+(__[a-zA-Z-]+)?$/,
    "selector-max-specificity": ["0,1,0", {
      ignoreSelectors: [/:.+/]
    }]
  }
}
