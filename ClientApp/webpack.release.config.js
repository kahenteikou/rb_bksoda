const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isDev = process.env.NODE_ENV === 'development';
const isReleaseCheckSize = process.env.CHECKSIZE === 'true';
module.exports = {
    mode: isDev ? 'development' : 'production',
    entry:
    {
        "index": "./src/index_index.tsx",
        "404": "./src/404.tsx",
        "usermanager":"./src/usermanager.tsx",
        "questionmanager":"./src/questionmanager.tsx"
        "questionsetmanager":"./src/questionsetmanager.tsx"
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].bundle.js",
        sourceMapFilename: '[file].map',
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
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial',
            cacheGroups: {
                react: {
                    test: /react/,
                    name: 'react',
                    chunks: 'all',
                }
            }
        }
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
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }],
            },
        ]
    },
    plugins: isReleaseCheckSize ? [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['index', 'vendor'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['404', 'vendor'],
            filename: '404.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['usermanager', 'vendor'],
            filename: 'usermanager.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['questionmanager', 'vendor'],
            filename: 'questionmanager.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['questionsetmanager', 'vendor'],
            filename: 'questionsetmanager.html'
        }),
        new CopyWebpackPlugin(
            {
                patterns: [
                    { from: "public", to: "./" }
                ]
            }
        ),

        new BundleAnalyzerPlugin()
    ] : [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['index', 'vendor'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['404', 'vendor'],
            filename: '404.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['usermanager', 'vendor'],
            filename: 'usermanager.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['questionmanager', 'vendor'],
            filename: 'questionmanager.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['questionsetmanager', 'vendor'],
            filename: 'questionsetmanager.html'
        }),
        new CopyWebpackPlugin(
            {
                patterns: [
                    { from: "public", to: "./" }
                ]
            }
        ),

    ],
}