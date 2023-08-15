// 定义链表节点
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// 定义链表类
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // 在链表的尾部添加节点
  append(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      // 如果链表为空，则设置新节点为头结点和尾节点
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 将新节点添加到尾节点后面，并更新尾节点
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // 在链表头部添加节点
  prepend(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      // 如果链表为空，则设置新节点为头结点和尾节点
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 将新节点插入到头节点前面，并更新头节点
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  // 在指定位置插入节点
  insert(index, value) {
    if (index === 0) {
      // 如果插入的位置为0，调用prepend()方法再头部插入节点
      this.prepend(value);
      return;
    }

    const newNode = new ListNode(value);
    let currentNode = this.head;
    let prevNode = null;
    let currentIndex = 0;

    // 找到要插入的节点
    while (currentIndex < index) {
      prevNode = currentNode;
      currentNode = currentNode?.next;
      currentIndex++;
      if (!currentNode) {
        // 如果到达链表的末尾，则将新节点插入到末尾并返回
        this.append(value);
        return;
      }
    }

    // 将新节点插入到指定位置，并更新节点引用
    newNode.next = currentNode;
    prevNode.next = newNode;
  }

  // 删除指定位置的节点
  remove(index) {
    if (index === 0) {
      // 如果删除的位置为0，将头结点指向下一节点并返回
      this.head = this.head.next;
      return;
    }

    let currentNode = this.head;
    let prevNode = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
      if (!currentNode) {
        // 如果到达链表尾部，则直接返回
        return;
      }
    }

    // 将前一个节点的next指向当前节点的下一个节点，实则删除节点
    prevNode.next = currentNode.next;

    if (currentNode === this.tail) {
      // 如果删除的是尾节点，则更新尾节点为前一节点
      this.tail = prevNode;
    }
  }

  // 遍历链表并执行回调函数
  traverse(callback) {
    let currentNode = this.head;
    while (currentNode) {
      callback(currentNode.value);
      currentNode = currentNode.next;
    }
  }

  // 将链表转为数组
  toArray() {
    const array = [];
    this.traverse((value) => array.push(value));
    return array;
  }

  // 通过索引获取节点的值
  get(index) {
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (currentIndex === index) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
      currentIndex++;
    }
    return null; // 如果索引无效，返回null或抛出异常等处理
  }
}

module.exports = LinkedList;

// 示例用法
const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.prepend(0);
linkedList.insert(2, 2.5);
linkedList.remove(4);
const array = linkedList.toArray();
// console.log(array); // 输出: [0, 1, 2, 2.5, 3]
