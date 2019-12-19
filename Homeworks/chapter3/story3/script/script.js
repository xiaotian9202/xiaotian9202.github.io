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
  + "<td class=\"message\">共计3件商品，210￥</td>";

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

// click checkbox of checkAll
var checkAll = document.querySelector(".checkAll");
checkAll.addEventListener("click", function() {
  var items = document.querySelectorAll(".check");
  for (var i = 0, lens = items.length; i < lens; i++) {
    items[i].checked = checkAll.checked;
  }
  changeMessage();
})

// click checkbox of check
var checks = document.querySelectorAll(".check");
for (var i = 0, lens = checks.length; i < lens; i++) {
  checks[i].addEventListener("click", function() {
    var flag = true;
    for (var j = 0, lens = checks.length; j < lens; j++) {
      if (!checks[j].checked) {
        flag = false;
        break;
      }
    }
    checkAll.checked = flag;
    changeMessage();
  })
}

// click button of the plus and minus
var btns = document.querySelectorAll(".plus-minus");
for (var k = 0, lens = btns.length; k < lens; k++) {
  btns[k].addEventListener("click", function() {
    var nodeOfTr = this.parentNode.parentNode;
    if (this.value === "-") {
      var itemNum = parseInt(this.nextElementSibling.innerHTML) - 1;
      if (itemNum <= 0) {
        nodeOfTr.parentNode.removeChild(nodeOfTr);
      } else {
        this.nextElementSibling.innerHTML = itemNum;
      }
    } else if (this.value === "+") {
      var itemNum = parseInt(this.previousElementSibling.innerHTML) + 1;
      this.previousElementSibling.innerHTML = itemNum;
    }
    var itemPrice = parseFloat(nodeOfTr.querySelector(".price").innerHTML);
    var totalPrice = getTotalPrice(itemNum, itemPrice);
    nodeOfTr.querySelector(".total").innerHTML = totalPrice;
    changeMessage();
  })
}