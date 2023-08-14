/**
 * 实现一个JS函数柯里化

预先处理的思想，利用闭包的机制

柯里化的定义：接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数
函数柯里化的主要作用和特点就是参数复用、提前返回和延迟执行



柯里化把多次传入的参数合并，柯里化是一个高阶函数
每次都返回一个新函数
每次入参都是一个

当柯里化函数接收到足够参数后，就会执行原函数，如何去确定何时达到足够的参数呢？
有两种思路：

通过函数的 length 属性，获取函数的形参个数，形参的个数就是所需的参数个数
在调用柯里化工具函数时，手动指定所需的参数个数
 */

// function curry(fn, args) {
//   let length = fn.length;
//   args = args || [];
//   return function () {
//     let newArgs = args.concat(Array.prototype.slice.call(arguments));
//     if (newArgs.length < length) {
//       return curry.call(this, fn, newArgs);
//     } else {
//       return fn.apply(this, newArgs);
//     }
//   };
// }

// // 分批传入参数
// // redux 源码的compose也是用了类似柯里化的操作
// const curry = (fn, arr = []) => {
//   // arr就是我们要收集每次调用时传入的参数
//   let len = fn.length; // 函数的长度，就是参数的个数
//   return function (...args) {
//     let newArgs = [...arr, ...args]; // 收集每次传入的参数
//     // 如果传入的参数个数等于我们指定的函数参数个数，就执行指定的真正函数
//     if (newArgs.length === len) {
//       return fn(...newArgs);
//     } else {
//       // 递归收集参数
//       return curry(fn, newArgs);
//     }
//   };
// };

const curry =
  (fn, arr = []) =>
  (...args) =>
    ((arg) => (arg.length === fn.length ? fn(...arg) : curry(fn, arg)))([
      ...arr,
      ...args,
    ]);

function multiFn(a, b, c) {
  return a * b * c;
}

let multi = curry(multiFn);

console.log(multi(2)(3)(4));
console.log(multi(2, 3, 4));
console.log(multi(2)(3, 4));
console.log(multi(2, 3)(4));
