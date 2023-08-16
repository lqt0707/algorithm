/**
 * 盛最多水的容器
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

示例 1：
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
示例 2：

输入：height = [1,1]
输出：1
说明：你不能倾斜容器。
 * @param {*} height 
 * @returns 
 */
const maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0; // 最大容积
  while (left < right) {
    // 计算出当前的容积与最大的容积比较，取出最大的
    const currentArea = (right - left) * Math.min(height[left], height[right]);
    maxArea = Math.max(currentArea, maxArea);
    // left向内移动
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxArea;
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]));