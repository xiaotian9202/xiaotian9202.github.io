'use strict';

function hybrid_operation(collection) {

  //在这里写入代码
  return collection.reduce((sum, item) => {
    return sum += item * 3 + 2;
  }, 0)
}

module.exports = hybrid_operation;

