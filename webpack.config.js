const path = require('path');

module.exports = {
    entry: './src/index.js', // Path to your main JavaScript file
    output: {
        path: path.resolve(__dirname, 'public/javascripts'), // Output directory
        filename: 'bundle.js' // Output file
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Regular expression to match JavaScript and JSX files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'] // Babel presets for ES6 and React
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'] // File extensions to process
    }
};
