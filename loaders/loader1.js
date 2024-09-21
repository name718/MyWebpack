// loader是一个函数
// 每个函数会接收源码
// 然后将其返回

function loader1(source){
    console.log('loader1');
    return source + '//loader1';
}
module.exports = loader1;