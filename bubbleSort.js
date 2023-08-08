/**
 * 冒泡排序

冒泡排序的原理如下，从第一个元素开始，把当前元素和下一个索引元素进行比较。
如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素，那么此时最后一个元素就是该数组中最大的数。
下一轮重复以上操作，但是此时最后一个元素已经是最大数了，所以不需要再比较最后一个元素，只需要比较到 length - 1 的位置。
 */

export function bubbleSort(list) {
  let n = list.length;
  if (!n) return n;
  let count = 0;
  // 需要遍历的元素
  for (let i = 0; i < n; i++) {
    // 需要比较的次数
    for (let j = 0; j < n - i - 1; j++) {
      count++;
      if (list[j] > list[j + 1]) {
        let temp = list[j + 1];
        list[j + 1] = list[j];
        list[j] = temp;
      }
    }
  }
  console.log(count);
  return list;
}

// console.log(bubbleSort([3, 1, 5]));
