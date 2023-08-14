// const newObj=JSON.parse(JSON.stringify(oldObj))

// function deepClone(obj) {
//   // 如果是 值类型 或 null，则直接return
//   if (typeof obj !== "object" || obj === null) {
//     return obj;
//   }

//   // 定义结果对象
//   let copy = {};

//   // 如果对象是数组，则定义结果数组
//   if (obj.constructor === Array) {
//     copy = [];
//   }

//   // 遍历对象的key
//   for (let key in obj) {
//     // 如果key是对象的自有属性
//     if (obj.hasOwnProperty(key)) {
//       // 递归调用深拷贝方法
//       copy[key] = deepClone(obj[key]);
//     }
//   }

//   return copy;
// }

// function deepClone(value, hash = new WeakMap()) {
//   // 弱引用，不用map，weakMap更合适一点
//   // null 和 undefiend 是不需要拷贝的
//   if (value == null) return value;
//   if (value instanceof RegExp) return new RegExp(value);
//   if (value instanceof Date) return new Date(value);
//   // 函数是不需要拷贝
//   if (typeof value !== "object") return value;
//   let obj = new value.constructor();
//   // 说明是一个对象类型
//   if (hash.get(value)) return hash.get(value);

//   hash.set(value, obj);
//   for (const key in value) {
//     // in 会遍历当前对象上的属性 和 __proto__指代的属性
//     // 补拷贝 对象的__proto__上的属性
//     if (Object.hasOwnProperty.call(value, key)) {
//       // 如果值还有可能是对象 就继续拷贝
//       obj[key] = deepClone(value[key], hash);
//     }
//   }
//   return obj;
// }

const getType = (obj) => Object.prototype.toString.call(obj);

const isObject = (target) =>
  (typeof target === "object" || typeof target === "function") &&
  target !== null;

const canTraverse = {
  "[object Map]": true,
  "[object Set]": true,
  "[object Array]": true,
  "[object Object]": true,
  "[object Arguments]": true,
};
const mapTag = "[object Map]";
const setTag = "[object Set]";
const boolTag = "[object Boolean]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const dateTag = "[object Date]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const handleRegExp = (target) => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
};

const handleFunc = (func) => {
  // 箭头函数直接返回自身
  if (!func.prototype) return func;
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if (!body) return null;
  if (param) {
    const paramArr = param[0].split(",");
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
};

const handleNotTraverse = (target, tag) => {
  const Ctor = target.constructor;
  switch (tag) {
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target));
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target));
    case stringTag:
      return new Object(String.prototype.valueOf.call(target));
    case symbolTag:
      return new Object(Symbol.prototype.valueOf.call(target));
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return handleRegExp(target);
    case funcTag:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
};

const deepClone = (target, map = new WeakMap()) => {
  if (!isObject(target)) return target;
  let type = getType(target);
  let cloneTarget;
  if (!canTraverse[type]) {
    // 处理不能遍历的对象
    return handleNotTraverse(target, type);
  } else {
    // 这波操作相当关键，可以保证对象的原型不丢失！
    let ctor = target.constructor;
    cloneTarget = new ctor();
  }

  if (map.get(target)) return target;
  map.set(target, true);

  if (type === mapTag) {
    //处理Map
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key, map), deepClone(item, map));
    });
  }

  if (type === setTag) {
    //处理Set
    target.forEach((item) => {
      cloneTarget.add(deepClone(item, map));
    });
  }

  // 处理数组和对象
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop], map);
    }
  }
  return cloneTarget;
};

var o = {};
o.x = 1;
var o1 = deepClone(o); // 如果这个对象拷贝过了 就返回那个拷贝的结果就可以了
console.log(o1);
