module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      files: ['js'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        packageDir: ['.'],
        optionalDependencies: false,
        peerDependencies: false,
        allowModules: ['gsap'],
      },
    ],
  },
  globals: {
    gsap: 'readonly',
  },
};
