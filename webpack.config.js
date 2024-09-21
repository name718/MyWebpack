const path = require("path");
const RunPlugin = require("./plugins/runPlugin")
const DonePlugin = require("./plugins/donePlugin")

module.exports = {
    mode: "development",
    devtool: false,
    // entry: './src/index.js',
    entry: {
        entry1: './src/entry1.js',
        entry2: './src/entry2.js',
    },
    output: {
        filename: "[name].js",
        path: path.resolve('dist')
    },
    plugins: [
        new RunPlugin(),
        new DonePlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    path.resolve(__dirname, 'loaders', 'loader1.js'),
                    path.resolve(__dirname, 'loaders', 'loader2.js'),
                ],
            }
        ]
    }
}