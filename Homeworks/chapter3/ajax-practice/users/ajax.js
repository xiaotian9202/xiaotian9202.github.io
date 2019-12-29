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
  options.data = options.data || "";
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

  switch (options.method) {
    case "GET": 
      xhr.send();
      break;

    case "POST":
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(options.data));
      break;

    case "PUT":
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(options.data));
        break;
  
    case "DELETE":
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    break;
  }
}