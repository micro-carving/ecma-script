// 1.引入fs模块（es5引入模块的方式）
const fs = require('fs');
// es6引入模块的方式，后续会学习
// import { readFile } from 'fs';

// 2.调用方法读取文件
fs.readFile('./resources/为学.md', (err, data) => {
  // 如果失败，则抛出错误
  if(err) throw err;
  // 如果没有出错，则输出内容
  console.log(data.toString());
});

// 3.使用Promise封装
const promise = new Promise((resolve, reject) => {
  fs.readFile('./resources/为学.md', (err, data) => {
    // 如果失败，则抛出错误
    if(err) reject(err);
    // 如果成功
    resolve(data);
  });
});

promise.then((value) => {
  // 控制台输出：为学的内容
  console.log(value.toString());
}, (reason) => {
  console.error("读取失败！");
});