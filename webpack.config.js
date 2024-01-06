const { glob } = require("glob")
const path = require("path")
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin")

data = {
    routes: glob("./src/pages/**/[a-z[]*.tsx")
}

module.exports = {
    mode: "development",
    entry: "./src/main.tsx", // <-- NEW
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
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
    // plugins: [
    //     new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
    // ],
    devServer: {
        historyApiFallback: {
            index: 'index.html'
        },
        static: path.join(__dirname, 'dist'),

        compress: true,
        port: 9000
    }
};