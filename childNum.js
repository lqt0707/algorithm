/**
 * 小孩报数问题
有30个小孩儿，编号从1-30，围成一圈依此报数，
1、2、3 数到 3 的小孩儿退出这个圈， 
然后下一个小孩 重新报数 1、2、3，
问最后剩下的那个小孩儿的编号是多少?
 * @param {number} num - 孩子总数
 * @param {number} count - 报数的计数值
 * @returns {*} - 最后一个留下的孩子编号
 */

function childNum(num, count) {
  let allplayer = [];
  for (let i = 0; i < num; i++) {
    // 将所有的小孩的报数记录下来
    allplayer[i] = i + 1;
  }

  let exitCount = 0; // 离开人数
  let counter = 0; // 记录报数
  let curIndex = 0; // 当前下标
  while (exitCount < num - 1) {
    // 如果没退出就重新报数
    if (allplayer[curIndex] !== 0) counter++;
    // 如果报数到了约定的值，改人就退出，退出的allplayer的值为0，重新开始报数
    if (counter === count) {
      allplayer[curIndex] = 0;
      counter = 0;
      exitCount++;
    }
    curIndex++;
    // 如果还是符合exitCount < num - 1重新开始新的一轮
    if (curIndex === num) {
      curIndex = 0;
    }
  }
  // 找出没有退出的人
  for (let i = 0; i < num; i++) {
    if (allplayer[i] !== 0) {
      return allplayer[i];
    }
  }
}
console.log(childNum(30, 3));
