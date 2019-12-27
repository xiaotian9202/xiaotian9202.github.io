'use strict';

function compare_collections(collection_a, collection_b) {
  //在这里写入代码
  var bool = true;
  for (var i = 0, lens = collection_a.length; i < lens; i++) {
    if (collection_a[i] !== collection_b[i]) {
      bool = false;
      break;
    }
  }
  return bool;
}

module.exports = compare_collections;


