var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: './dist',
        filename: 'app.js'
    },
    module: {
      loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.json$/, loaders: ['json']
        }
      ]
    }
};
