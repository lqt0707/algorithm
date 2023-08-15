const arr = [12, 34, 23, 23, 123, 342, 12];
// 1. 数组求和
const sum = arr.reduce((total, num) => total + num, 0);
console.log(sum);

// 2. 数组最大值
const max = arr.reduce((pre, cur) => (pre > cur ? pre : cur), 0);
console.log(max);

// 3. 数组转对象
var streams = [
  { name: "技术", id: 1 },
  { name: "设计", id: 2 },
];
var obj = streams.reduce((accumulator, cur) => {
  accumulator[cur.id] = cur;
  return accumulator;
}, {});

console.log(obj);

//4. 扁平一个二维数组
var arrs = [
  [1, 2, 8],
  [3, 4, 9],
  [5, 6, 10],
];
var res = arrs.reduce((x, y) => x.concat(y), []);
console.log(res);

// 5. 数组去重
var newArr = arr.reduce((prev, cur) => {
  prev.indexOf(cur) === -1 && prev.push(cur);
  return prev;
}, []);
console.log(newArr);

// 6. 对象数组去重
const objArr = [
  { name: "技术", id: 1 },
  { name: "设计", id: 2 },
  { name: "技术", id: 1 },
  { name: "设计", id: 2 },
  { name: "设计", id: 3 },
];
const dedup = (data, getKey = () => {}) => {
  const dataMap = data.reduce((prev, cur) => {
    const key = getKey(cur);
    if (!prev[key]) {
      prev[key] = cur;
    }
    return prev;
  }, {});

  return Object.values(dataMap);
};

console.log(dedup(newArr));

// 7. 求字符串中字母出现的次数
const str = "sfhjasfjgfasjuwqrqadqeiqsajsdaiwqdaklldflas-cmxzmnha";

const result = str.split("").reduce((pre, next) => {
  pre[next] ? pre[next]++ : (pre[next] = 1);
  return pre;
}, {});

console.log(result);

//8. compose函数 redux compose 源码实现
function compose(...funs) {
  if (funs.length === 0) {
    return (arg) => arg;
  }
  if (funs.length === 1) {
    return funs[0];
  }
  return funs.reduce(
    (a, b) =>
      (...arg) =>
        a(b(...arg))
  );
}
