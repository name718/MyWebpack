// loader是一个函数
// 每个函数会接收源码
// 然后将其返回

function loader2(source){
    console.log('loader2');
    return source + '//loader2';
}
module.exports = loader2;