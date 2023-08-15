/**
 * 实现LRU淘汰算法
LRU 缓存算法是一个非常经典的算法，在很多面试中经常问道，不仅仅包括前端面试

LRU 英文全称是 Least Recently Used，英译过来就是” 最近最少使用 “的意思。LRU 是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，当须淘汰一个页面时，选择现有页面中其 t 值最大的，即最近最少使用的页面予以淘汰

通俗的解释：

假如我们有一块内存，专门用来缓存我们最近发访问的网页，访问一个新网页，我们就会往内存中添加一个网页地址，随着网页的不断增加，内存存满了，这个时候我们就需要考虑删除一些网页了。这个时候我们找到内存中最早访问的那个网页地址，然后把它删掉。这一整个过程就可以称之为 LRU 算法


上图就很好的解释了 LRU 算法在干嘛了，其实非常简单，无非就是我们往内存里面添加或者删除元素的时候，遵循最近最少使用原则
使用场景
LRU 算法使用的场景非常多，这里简单举几个例子即可：

我们操作系统底层的内存管理，其中就包括有 LRU 算法
我们常见的缓存服务，比如 redis 等等
比如浏览器的最近浏览记录存储
vue中的keep-alive组件使用了LRU算法

梳理实现 LRU 思路

特点分析：

我们需要一块有限的存储空间，因为无限的化就没必要使用LRU算发删除数据了。
我们这块存储空间里面存储的数据需要是有序的，因为我们必须要顺序来删除数据，所以可以考虑使用 Array、Map 数据结构来存储，不能使用 Object，因为它是无序的。
我们能够删除或者添加以及获取到这块存储空间中的指定数据。
存储空间存满之后，在添加数据时，会自动删除时间最久远的那条数据。


实现需求：

实现一个 LRUCache 类型，用来充当存储空间
采用 Map 数据结构存储数据，因为它的存取时间复杂度为 O(1)，数组为 O(n)
实现 get 和 set 方法，用来获取和添加数据
我们的存储空间有长度限制，所以无需提供删除方法，存储满之后，自动删除最久远的那条数据
当使用 get 获取数据后，该条数据需要更新到最前面

 */

class LRUCache {
  constructor(length) {
    this.length = length; // 存储长度
    this.data = new Map(); // 存储数据
  }

  // 存储数据，通过键值的方式
  set(key, value) {
    const data = this.data;
    if (data.has(key)) {
      data.delete(key);
    }
    data.set(key, value);

    // 如果超出了容量，则需要删除最久的数据
    if (data.size > this.length) {
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }

  // 获取数据
  get(key) {
    const data = this.data;
    // 未找到
    if (!data.has(key)) {
      return null;
    }
    const value = data.get(key);
    data.delete(key);
    data.set(key, value); // 重新插入该条数据，确保将该条数据移动到最前面
    return value;
  }
}

const lruCache = new LRUCache(5);

lruCache.set("name", "test");
lruCache.set("age", 10);
lruCache.set("sex", "男");
lruCache.set("height", 180);
lruCache.set("weight", "120");
console.log(lruCache);
