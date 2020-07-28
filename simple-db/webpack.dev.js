let common = require('./webpack.config.js')

common['mode'] = 'development'; 
common['devtool'] = 'inline-source-map'; 
common['devServer'] = {
    contentBase: './dist',
}; 

module.exports = common; 