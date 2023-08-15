const LinkedList = require("./LinkedList");

//  链表默认使用数组来模拟队列，性能更佳
class Queue {
  constructor() {
    this.ll = new LinkedList();
  }
  // 向队列中添加
  offer(elem) {
    this.ll.append(elem);
  }
  // 查看第一个
  peek() {
    return this.ll.get(0);
  }

  // 队列只能从头部删除
  remove() {
    return this.ll.remove(0);
  }
}

var queue = new Queue();

queue.offer(1);
queue.offer(2);
queue.offer(3);
var removeVal = queue.remove(3);

console.log(queue.ll, "queue.ll");
console.log(removeVal, "queue.remove");
console.log(queue.peek(), "queue.peek");
