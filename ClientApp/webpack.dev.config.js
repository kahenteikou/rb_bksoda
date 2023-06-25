const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "index.js"
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    watch: isDev,
    devtool: isDev ? 'source-map' : undefined,
    devServer: {
        port: 3000,
        historyApiFallback: true,
        static: { directory: path.join(__dirname, 'public'), }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '404.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'usermanager.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'questionmanager.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'questionsetmanager.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'questionsetedit.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'targetscreen.html'
        }),
        
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'screencontroller.html'
        }),
        

        new CopyWebpackPlugin(
            {
                patterns:[
                    {from:"public",to:"./"}
                ]
            }
        )
    ],
}