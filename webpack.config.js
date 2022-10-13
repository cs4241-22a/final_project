const path = require('path');
module.exports = {
    
    entry: './src/index.js',

    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
          },
		extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
        
	},
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    module: {
        rules: 
        [
            {   test: /\.(html|svelte)$/,
                use: 'svelte-loader'},
            {
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false
            }
        }
        ],
    },
 
};