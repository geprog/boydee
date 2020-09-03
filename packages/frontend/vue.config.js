module.exports = {
  publicPath: process.env.BASE_URL || '/',
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
    progress: false,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear();

    // add replacement loader(s)
    svgRule.use('html-loader').loader('html-loader').options({ minimize: true });
  },
  configureWebpack: {
    // source map configuration frmo here: https://www.mistergoodcat.com/post/the-joy-that-is-source-maps-with-vuejs-and-typescript
    devtool: 'eval-source-map',
    output: {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      devtoolModuleFilenameTemplate: (info) => {
        let $filename = 'sources://' + info.resourcePath;
        if (info.resourcePath.match(/\.vue$/) && !info.query.match(/type=script/)) {
          $filename = 'webpack-generated:///' + info.resourcePath + '?' + info.hash;
        }
        return $filename;
      },
      devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
    },
    externals: {
      'react-native-sqlite-storage': 'react-native-sqlite-storage',
    },
  },
};
