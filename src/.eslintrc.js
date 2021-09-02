module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "import/extensions": "off",
    "prettier/prettier": "warn",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off"
  },
  settings: {
    "react": {
      "version": "detect"
    }
  }
};