window.onload = initPage;
// localStorage.clear();

function initPage() {
  // init list use localStorage.jsonData
  if (localStorage.jsonData) {
    jsonToList("all");
  }

  var main = document.querySelector(".main");
  var input = document.querySelector(".input");
  var list = document.querySelector(".list");
  var flag = "all";

  main.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && input.value.trim()) {
      addOrStoreList(input, list, flag);
    }
  })

  main.addEventListener("click", function (e) {
    var targetEvent = e.target;
    if (targetEvent.className === "add" && input.value.trim()) {
      addOrStoreList(input, list, flag);
    }

    if (targetEvent.className === "check") {
      var checked = "";
      if (!targetEvent.checked) {
        targetEvent.parentElement.className = "";
      } else {
        checked = "checked";
        targetEvent.parentElement.className = "add-line-through";
      }
      var text = targetEvent.nextElementSibling.innerHTML;
      var data = JSON.parse(localStorage.jsonData);
      for (var i = 0, lens = data.length; i < lens; i++) {
        if (data[i].text === text) {
          data[i].checked = checked;
          break;
        }
      }
      localStorage.jsonData = JSON.stringify(data);
    }

    if (targetEvent.className === "all"
      || targetEvent.className === "active"
      || targetEvent.className === "complete") {
      flag = targetEvent.className;
      list.innerHTML = "";
      jsonToList(flag);
    }
    })
  }

function addOrStoreList(input, list, flag) {
  if (flag === "all" || flag === "active") {
    addList(list, input.value.trim());
  }
  storeDataToLocal(input.value.trim());
  input.value = "";
}

function storeDataToLocal(value) {
  if (!localStorage.jsonData) {
    var jsonData = [];
    var data = JSON.stringify(jsonData);
    localStorage.setItem("jsonData", data);
  }
  var jsonData = JSON.parse(localStorage.jsonData);
  var Obj = {
    "text": value,
    "checked": ""
  }
  jsonData.push(Obj);
  localStorage.setItem("jsonData", JSON.stringify(jsonData));
}

function addList(node, text, className) {
  if (!className) {
    node.innerHTML += "<li><input type='checkbox' class= 'check'/ >" 
      + "<span>" + text + "</span></li>";
  } else {
    node.innerHTML += "<li class="+ className +"><input type='checkbox' class= 'check' checked='checked'/ >" 
      + "<span>" + text + "</span></li>";
  }
}

function jsonToList(flag) {
  if (!localStorage.jsonData) {
    alert("don't have any data");
    return;
  }
  var list = document.querySelector('.list');
  var jsonData = JSON.parse(localStorage.jsonData);

  for (var k = 0, lens = jsonData.length; k < lens; k++) {
    if (flag === "all") {
      if (!jsonData[k].checked) {
        addList(list, jsonData[k].text);
      } else {
        addList(list, jsonData[k].text, "add-line-through");
      }
    } else if (flag === "active" && (!jsonData[k].checked)) {
      addList(list, jsonData[k].text);
    } else if (flag === "complete" && jsonData[k].checked) {
      addList(list, jsonData[k].text, "add-line-through");
    }
  }
}