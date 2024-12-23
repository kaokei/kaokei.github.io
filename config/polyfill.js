// https://jscompress.com/
(function () {
  if (!window.globalThis) {
    window.globalThis = window;
  }

  if (!window.queueMicrotask) {
    window.queueMicrotask = function (callback) {
      Promise.resolve()
        .then(callback)
        .catch((e) =>
          setTimeout(() => {
            throw e;
          }, 0),
        );
    };
  }

  if (![].at) {
    Array.prototype.at = function (index) {
      // 将参数`index`转为整数:
      index = Math.trunc(index) || 0;

      // 处理负数索引:
      if (index < 0) {
        index += this.length;
      }

      // 如果索引超出数范围，返回 undefined:
      if (index < 0 || index >= this.length) {
        return undefined;
      }

      // 返回数组中对应位置的元素:
      return this[index];
    };
  }

  if (![].flatMap) {
    Array.prototype.flatMap = function (callback, thisArg) {
      // 获取调用 flatMap 的数组
      var array = Object(this);
      var len = array.length >>> 0;

      // 创建一个新数组来存放结果
      var result = [];

      // 遍历数组中的每个元素，并调用回调函数
      for (var i = 0; i < len; i++) {
        if (i in array) {
          var res = callback.call(thisArg, array[i], i, array);
          // 将结果扁平化并添加到结果数组
          result = result.concat(res);
        }
      }

      return result;
    };
  }

  if (!Promise.allSettled) {
    Promise.allSettled = function (promises) {
      var wrappedPromises = promises.map((p) => Promise.resolve(p));
      return Promise.all(
        wrappedPromises.map(function (promise) {
          return promise
            .then(function (value) {
              return {
                status: 'fulfilled',
                value: value,
              };
            })
            .catch(function (reason) {
              return {
                status: 'rejected',
                reason: reason,
              };
            });
        }),
      );
    };
  }
})();
