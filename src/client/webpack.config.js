
module.exports = {
    entry: './index.js',
    target: 'web',
    output: {
        path: '.',
        filename: 'index.bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react'],
          }
        },
        {
          test: /\.scss$/,
          loaders: ["style", "css", "sass"]
        },
      ]
    }
};
