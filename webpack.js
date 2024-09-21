const Compiler = require("./Compiler");

function webpack(config) {

    // 获取命令行参数
    let shellOptions = process.argv.slice(2).reduce((config, args) => {
        let [key, value] = args.split('=')
        config[key.slice('2')] = value
        return config
    }, {});
    // 合并config合shellOption
    const finalOptions = {...config, ...shellOptions};
    console.log(finalOptions);

    let compiler = new Compiler(finalOptions)

    //? webpack的插件是什么时候挂载的，是什么时候执行的
    // 大部份插件都不是立即执行的
    finalOptions.plugins.forEach((plugin) => {
        console.log(plugin)
        plugin.apply(compiler);
    })
    return compiler
}

module.exports = webpack;