// 在webpack中，一切皆插件，一个插件一个类，每个类有apply方法，参数为compiler实例

class DonePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('DonePlugin', (compiler) => {
            console.log('DonePlugin')
        })
    }
}
module.exports = DonePlugin