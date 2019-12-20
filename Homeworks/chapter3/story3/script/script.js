var carProducts = [
  {
    "id": 1,
    "name": "英雄牌 钢笔",
    "count": 1,
    "price": 69,
    "checked": false
  },
  {
    "id": 2,
    "name": "晨光牌 铅字笔",
    "count": 2,
    "price": 5.5,
    "checked": true
  },
  {
    "id": 3,
    "name": "晨光牌 铅笔",
    "count": 1,
    "price": 2,
    "checked": false
  },
  {
    "id": 4,
    "name": "狗熊牌 橡皮擦",
    "count": 1,
    "price": 1,
    "checked": false
  },
  {
    "id": 5,
    "name": "瑞士牌 双肩书包",
    "count": 1,
    "price": 199,
    "checked": true
  },
  {
    "id": 6,
    "name": "晨光牌 作业本",
    "count": 5,
    "price": 2.5,
    "checked": false
  }
]

function getType(val) {
  return val ? "checked" : "";
}

var tbody = document.querySelector("tbody");
for (var i = 0, len = carProducts.length; i < len; i++) {
  tbody.innerHTML += "<tr id=\"item"+ carProducts[i].id + "\"></tr>";
  var id = "#item" + carProducts[i].id;
  var tr = document.querySelector(id);
  tr.innerHTML = "<td>"
  + "<input class=\"check\" type=\"checkbox\"" + getType(carProducts[i].checked) + " / >" 
  + "</td>" 
  + "<td>" + carProducts[i].name + "</td>" 
  + "<td class=\"price\">" + carProducts[i].price + "</td>"
  + "<td>" 
  + "<input class=\"plus-minus btn-style\" type=\"button\" value=\"-\" />"
  + "<span class=\"nums\">" + carProducts[i].count + "</span>"
  + "<input class=\"plus-minus btn-style\" type=\"button\" value=\"+\" />"
  + "</td>"
  + "<td class=\"total\">" + carProducts[i].price * carProducts[i].count +"</td>";
}
tbody.innerHTML += "<td><span>全选</span>"
  + "<input class=\"checkAll\" type=\"checkbox\"/>"
  + "</td>"
  + "<td></td>"
  + "<td></td>"
  + "<td></td>"
  + "<td class=\"message\">共计" 
  + "<span class=\"totalNums\">3</span>件商品，"
  + "<span class=\"totalMoney\">210</span>￥" 
  + "</td>";

// get total money of pre items
function getTotalPrice(itemCount, itemPrice) {
  var totalPrice = itemCount * itemPrice;
  return totalPrice;
}

// get the message of items numbers and total money
function changeMessage() {
  var items = document.querySelectorAll(".check");
  var totalMoney = 0;
  var totalItems = 0;
  for (var i = 0, lens = items.length; i < lens; i++) {
    if (items[i].checked) {
      totalMoney += parseFloat(items[i].parentNode.parentNode.querySelector(".total").innerHTML);
      totalItems += parseInt(items[i].parentNode.parentNode.querySelector(".nums").innerHTML) 
    }
  }
  var message = document.querySelector(".message");
  message.innerHTML = "共计" + totalItems + "件商品," + totalMoney + "￥";
}

function isCheckAll() {
  var checks = document.querySelectorAll(".check");
  var checkAll = document.querySelector(".checkAll");
  var flag = true;
  for (var i = 0, lens = checks.length; i < lens; i++) {
    if (!checks[i].checked) {
      flag = false;
    }
  }
  checkAll.checked = flag;
}

var table = document.querySelector("table");
table.addEventListener("click", function(e) {
  if (e.target.className === "check") {
    isCheckAll();
    changeMessage();
  }

  if (e.target.className === "checkAll") {
    var checks = document.querySelectorAll(".check");
    for (var i = 0, lens = checks.length; i < lens; i++) {
      checks[i].checked = e.target.checked;
    }
    changeMessage();
  }

  if (e.target.className === "plus-minus btn-style") {
    var nodeOfTr = e.target.parentNode.parentNode;
    if (e.target.value === "-") {
      var itemNum = parseInt(e.target.nextElementSibling.innerHTML) - 1;
      if (itemNum <= 0) {
        nodeOfTr.parentNode.removeChild(nodeOfTr);
      } else {
        e.target.nextElementSibling.innerHTML = itemNum;
      }
    } else if (e.target.value === "+") {
      var itemNum = parseInt(e.target.previousElementSibling.innerHTML) + 1;
      e.target.previousElementSibling.innerHTML = itemNum;
    }
    var itemPrice = parseFloat(nodeOfTr.querySelector(".price").innerHTML);
    var totalPrice = getTotalPrice(itemNum, itemPrice);
    nodeOfTr.querySelector(".total").innerHTML = totalPrice;
    changeMessage();
  }
})