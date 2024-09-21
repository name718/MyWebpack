const {SyncHook} = require('tapable')

const h1 = new SyncHook()

h1.tap('事件1', () => {
    console.log('事件1')
})
h1.tap('事件2', () => {
    console.log('事件2')
})
h1.call()