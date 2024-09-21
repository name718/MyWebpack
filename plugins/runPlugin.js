// 在webpack中，一切皆插件，一个插件一个类，每个类有apply方法，参数为compiler实例
// 挂在插件就是将compiler传递给apple,只要调用apply就可以了
// 挂在之后，不会立即执行，如果执行就需要使用tapable库
// 发布订阅
class RunPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('RunPlugin', (compiler) => {
            console.log('RunPlugin')
        })
    }
}

module.exports = RunPlugin