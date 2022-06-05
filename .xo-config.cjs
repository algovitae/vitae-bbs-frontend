module.exports = {
  space: 2,
  envs: ['es2021'],
  extends: [
    'xo',
    'xo-typescript',
    'xo-react'
  ],
  rules: {
    "@typescript-eslint/no-implicit-any-catch": "off",
    "import/extensions": "off",
    "react/react-in-jsx-scope": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-await-expression-member": "off",
  },
  ignores: [
    'craco.config.js',
    'src/react-app-env.d.ts',
    'src/setupTests.ts',
    'src/api/generated.ts'
  ]
}