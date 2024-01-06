const path = require("path")
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin")


module.exports = {
    mode: "development",
    entry: "./src/main.tsx", // <-- NE
    output: {
        publicPath: 'dist',
        chunkFilename: "js/[name].[hash].js",
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
                test: /\.svg$/, // Ładuje pliki SVG
                loader: 'svg-inline-loader',
                generator: {
                    filename: 'svg/[name][ext]', // Katalog dla czcionek
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
    },

    devServer: {
        historyApiFallback: {
            index: 'index.html'
        },
        static: path.join(__dirname, 'hosting'),

        compress: true,
        port: 9000
    }
};