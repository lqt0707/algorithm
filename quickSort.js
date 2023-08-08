/**
 * 快速排序
快排的原理如下。
随机选取一个数组中的值作为基准值，从左至右取值与基准值对比大小。
比基准值小的放数组左边，大的放右边，对比完成后将基准值和第一个比基准值大的值交换位置。
然后将数组以基准值的位置分为两部分，继续递归以上操作.
 */
export function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let baseIndex = Math.floor(arr.length / 2); // 向下取整，选取基准点
  let base = arr.splice(baseIndex, 1)[0]; // 取出基准点的值
  // splice 通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
  // slice方法返回一个新的数组对象,不会更改原数组
  //这里不能直接base=arr[baseIndex],因为base代表的每次都删除的那个数

  let left = [];
  let right = [];
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] < base) {
      left.push(arr[index]); //比基准点小的放在左边数组，
    } else {
      right.push(arr[index]); //比基准点大的放在右边数组，
    }
  }

  return quickSort(left).concat([base], quickSort(right));
}

// console.log(quickSort([3, 1, 5, 4, 64, 322, 3, 26, 7, 0]));
