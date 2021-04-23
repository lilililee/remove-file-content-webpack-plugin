const path = require('path')
const RemoveFileContentpWebpackPlugin = require('../index.js')
const { argv } = require('yargs')

module.exports = {
  mode: 'development',
  entry: {
    main: [path.resolve(__dirname, 'src/entry.js')]
  },
  output: {
    publicPath: ''
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: []
  },
  plugins: [
    new RemoveFileContentpWebpackPlugin({
      preset: argv.preset
    })
  ]
}
