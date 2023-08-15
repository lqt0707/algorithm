Array.prototype.myMap = function (callback, context) {
  // 转换类数组
  let arr = Array.prototype.slice.call(this), //由于是ES5所以就不用...展开符了
    mappedArr = [],
    i = 0;
  for (; i < arr.length; i++) {
    // 把当前值、索引、当前数组返回去。调用的时候传到函数参数中 [1,2,3,4].map((curr,index,arr))
    mappedArr.push(callback.call(context, arr[i], i, this));
  }

  return mappedArr;
};
