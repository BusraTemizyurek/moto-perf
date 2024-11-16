const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ],
    },
    devServer: {
        static: './public',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        roots: [__dirname, path.resolve(__dirname, "public")]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/templates/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};