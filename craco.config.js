const CracoLessPlugin = require('craco-less');

module.exports = {
  eslint: {
    enabled: false
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {'@primary-color': '#1890FF'},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
