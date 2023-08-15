Array.prototype.myEvery = function (callback, context = window) {
  var len = this.length,
    flag = true,
    i = 0;
  for (; i < len; i++) {
    if (!callback.apply(context, [this[i], i, this])) {
      flag = false;
      break;
    }
  }
  return flag;
};
