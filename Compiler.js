const path = require("path");
const fs = require("fs");
const types = require("babel-types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const {SyncHook} = require('tapable');
const options = require("./webpack.config");
const toUnixPath = require("./utils");

class Compiler {
    constructor(options) {
        this.options = options || {};
        this.hooks = {
            run: new SyncHook(), done: new SyncHook(), emit: new SyncHook(),
        }
        this.context = options.context || process.cwd();
    }

    run() {
        // 根据配置获取入口配置
        let entry = {}

        if (typeof this.options.entry === 'string') {
            entry.main = this.options.entry
        } else {
            entry = this.options.entry
        }
        console.log(entry);

        // loader是什么时候工作的 --- 打包之前执行
        // 找到对应的配置，将被打包文件的源代码拿出来交给loader，处理后在返回
        console.log(entry);
        console.log(process.cwd()); // 当前的工作目录
        // 1. 确定路径
        // 2. 调用loader
        for (let entryName in entry) {
            const entryPath = toUnixPath(path.join(this.context, entry[entryName]));
            console.log(entryPath);
            // 开始编译
            this.buildModule(entryName, entryPath);
        }
    }

    buildModule(moduleName, modulePath) {
        // 读取源代码
        const originalSourceCode = fs.readFileSync(modulePath, 'utf-8');
        let targetSourceCode = originalSourceCode;

        let loaders = []
        let rules = this.options.module.rules;
        for (let i = 0; i < rules.length; i++) {
            if (rules[i].test.test(modulePath)) {
                // 执行loader
                loaders = [...loaders, ...rules[i].use];
            }
        }
        // 采用降序的模式调用loader
        for (let i = loaders.length - 1; i >= 0; i--) {
            targetSourceCode = require(loaders[i])(targetSourceCode);
        }
        console.log(targetSourceCode);

        // 实现模块的递归编译,单层+递归
        // 模块id
        const moduleID = './' + path.posix.resolve(toUnixPath(this.context), modulePath);
        console.log(moduleID);
        // 定义容器，保存
        let module = {id: moduleID, name: moduleName, dependencies: []};

        // 使用AST
        // 代码修改完成后，找个地方暂存

        const ast = parser.parse(targetSourceCode, {sourceType: 'module'});
    }
}

module.exports = Compiler;