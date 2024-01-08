const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path")
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = {
    mode: "development",
    entry: "./src/main.tsx", // <-- NE
    output: {
        publicPath: "/",
        chunkFilename: "js/[name].[chunkhash].js",
        filename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/i, // Ładuje obrazy
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]', // Katalog dla czcionek
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]', // Katalog dla czcionek
                },
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, , 'postcss-loader'],
            },
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

        ],
    },
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
        // @ts-ignore
        plugins: [new TsconfigPathsPlugin()]
    },
    plugins: [new HtmlWebpackPlugin({template:"./src/index.html" })],
    devServer: {
        historyApiFallback: true,
        // static: path.join(__dirname, 'hosting'),
        compress: true,
        port: 9000
    }
};