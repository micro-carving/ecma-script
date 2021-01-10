// 引入 fs 模块
const fs = require("fs");

// 1.使用普通方式读取多个文件
fs.readFile('./resources/插秧诗.md', (err1, data1) => {
  fs.readFile('./resources/观书有感.md', (err2, data2) => {
    fs.readFile('./resources/为学.md', (err3, data3) => {
      let result = `${data1}\r\n${data2}\r\n${data3}`;
      // let result = data1 + '\r\n' +data2  +'\r\n'+ data3;
      console.log(result);
    });
  });
});

// 2.使用Promise方式读取多个文件
const p = new Promise((resolve, reject) => {
  fs.readFile('./resources/插秧诗.md', (err, data) => {
    resolve(data);
    reject(err);
  });
});

p.then((value) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./resources/观书有感.md', (err, data) => {
      // resolve(`${value}\r\n${data}`);
      // 或者
      // 将其返回结果构造成一个数组形式
      resolve([value, data]);
      reject(`${err}`);
    });
  });
},(reason) => {
  // 控制台输出：如果最外层Promise发生错误，此处输出undefine
  console.log(reason);
}).then((value) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./resources/为学.md', (err, data) => {
      // resolve(`\r\n${value}\r\n${data}`);
      // 或者
      // 因为value为数组类型，所以此处可以进行压入操作
      value.push(data);
      resolve(value);
      reject(`${err}`);
    });
  });
}, (reason) => {
  // 控制台输出：如果上一层Promise发生错误，此处输出undefine
  console.log(reason);
}).then((value) => {
  // 控制台输出：所有内容
  // console.log(value);
  console.log(value.join('\r\n'));
}, (reason) => {
  // 控制台输出：如果上一层Promise发生错误，此处输出undefine
  console.log(reason);
});