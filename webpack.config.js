module.exports = {
    entry: './src/app.js',
    target: 'node',
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
