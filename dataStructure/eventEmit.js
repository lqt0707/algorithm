class myEvent {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(callback);
  }

  off(eventName, callback) {
    if (this.listeners.has(eventName)) {
      const eventListeners = this.listeners.get(eventName);
      const index = eventListeners.indexOf(callback);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  once(eventName, callback) {
    const onceCallback = (...args) => {
      callback.apply(this, args);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }

  trigger(eventName, ...args) {
    if (this.listeners.has(eventName)) {
      const eventListeners = this.listeners.get(eventName).slice();
      eventListeners.forEach((callback) => {
        callback.apply(this, args);
      });
    }
  }
}

const myevent = new myEvent();

const callback1 = () => {
  console.log('Event 1 triggered');
};

const callback2 = () => {
  console.log('Event 2 triggered');
};

myevent.on('event1', callback1);
myevent.on('event2', callback2);

myevent.trigger('event1'); // 输出: "Event 1 triggered"

myevent.off('event1', callback1);
myevent.trigger('event1'); // 无输出，已移除监听器

myevent.once('event2', () => {
  console.log('Event 2 triggered only once');
});

myevent.trigger('event2'); // 输出: "Event 2 triggered" 和 "Event 2 triggered only once"
myevent.trigger('event2'); // 无输出，只触发一次