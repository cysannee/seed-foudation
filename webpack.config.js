var path = require('path'); /* require method is provided by Node */

/* the starting point file for javascript. the final file, the one compiled/bundled by webpack, injects js files in the correct order according to their dependencies/imports */
module.exports = {
    entry: {
        app: './src/js/app.js',
        vendor: './src/js/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'src/temp/js'),
        filename: '[name].js'
    },
    module: {
        rules: [ /* loaders are used for transforming */
            {
                test: /\.js$/, /* condition for file transformation */
                exclude: /(node_modules|bower_components)/, /* prevents transforming js files in node_modules */
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }   
                }
            }
        ]
    }
}