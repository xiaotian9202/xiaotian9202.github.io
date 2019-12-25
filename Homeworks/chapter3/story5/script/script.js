window.onload = initPage;
// localStorage.clear();

function initPage() {
  // init list use localStorage.jsonData
  if (localStorage.jsonData) {
    jsonToList("all");
  }

  var header = document.querySelector(".main");
  var footer = document.querySelector(".footer");
  var list = document.querySelector(".list");
  var input = document.querySelector(".input")
  var flag = "all";

  header.addEventListener("keyup", function(e) {
    addOrStoreList(e, list, input, flag);
  });
  header.addEventListener("click", function(e) {
    addOrStoreList(e, list, input, flag);
  });
  list.addEventListener("click", changeStatuOfList);
  footer.addEventListener("click", function(e) {
    if (event.target.className === "all"
    || event.target.className === "active"
    || event.target.className === "complete") {
    flag = event.target.className;
    list.innerHTML = "";
    jsonToList(flag);
  }
});
}

function addOrStoreList(event, list, input, flag) {
  if ((event.target.className === "add" || event.key === "Enter")
    && input.value.trim()) {
    if (flag === "all" || flag === "active") {
      addList(list, input.value.trim());
    }
    storeDataToLocal(input.value.trim());
    input.value = "";
  }
  console.log(localStorage);
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
    switch (flag) {
      case "all":
        if (!jsonData[k].checked) {
          addList(list, jsonData[k].text);
        } else {
          addList(list, jsonData[k].text, "add-line-through");
        }
        break;
      case "active": 
        if (!jsonData[k].checked) {
          addList(list, jsonData[k].text);
        }
        break;
      case "complete":
        if (jsonData[k].checked) {
          addList(list, jsonData[k].text, "add-line-through");
        }
        break;
    }
  }
}

function changeStatuOfList(e) {
  var targetEvent = e.target;
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
}