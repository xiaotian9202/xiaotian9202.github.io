/**
options = {
  url: "",
  method: "",
  headers: {}, 
  data: "",
  success: function(result) {},  // 请求成功后调用此方法
  fail: function(error) {}    // 请求失败或出错后调用此方法
}
**/
window.ajax = function (options) {
  if (typeof(options.success) !== 'function'
    || typeof(options.fail) !== 'function') {
    alert("The type of options.success or options.fail has to be an function");
  }

  var xhr = new XMLHttpRequest();
  options.data = JSON.stringify(options.data) || null;
  options.method = options.method.toUpperCase();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        options.success(JSON.parse(xhr.responseText));
      } else {
        options.fail(xhr.status);
      }
    }
}

  xhr.open(options.method, options.url, true);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(options.data);
}