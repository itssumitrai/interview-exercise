const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.js',
    mode: isDevelopment ? 'development' : 'production',
    output: {
        filename: 'main.js'
    },
    devServer: {
        contentBase: '.',
        open: true,
        hot: true,
        overlay: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            [
                                '@babel/preset-react',
                                {
                                    development: isDevelopment,
                                    runtime: 'automatic'
                                }
                            ]
                        ],
                        plugins: [isDevelopment && 'react-refresh/babel'].filter(Boolean)
                    }
                }
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    },
    plugins: [
        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin()
    ].filter(Boolean)
};
