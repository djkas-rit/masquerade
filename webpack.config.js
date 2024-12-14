const path = require('path');
const { login, accountSettings } = require('./server/controllers/Account');

module.exports = {
  entry: {
    login: './client/login.jsx',
    maker: './client/maker.jsx',
    list: './client/list.jsx',
    account: './client/account.jsx',
    messages: './client/messages.jsx',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  mode: 'production',
  watchOptions: {
    aggregateTimeout: 200,
  },
  output: {
    path: path.resolve(__dirname, 'hosted'),
    filename: '[name]Bundle.js',
  },
};
