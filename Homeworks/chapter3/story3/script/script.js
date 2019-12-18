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

var tbody = document.querySelector("tbody");
for (var i = 0, len = carProducts.length; i < len; i++) {
  var tr = document.createElement("tr");

  var td1 = document.createElement("td");
  td1.style.border = "1px solid rgb(219, 211, 211)"
  var check = document.createElement("input");
  check.className = "check";
  check.type = "checkbox";
  check.checked = carProducts[i].checked ? "checked" : "";
  td1.appendChild(check);
  tr.appendChild(td1);

  var td2 = document.createElement("td");
  td2.style.border = "1px solid rgb(219, 211, 211)"
  td2.innerHTML = carProducts[i].name;
  tr.appendChild(td2);

  var td3 = document.createElement("td");
  td3.style.border = "1px solid rgb(219, 211, 211)"
  td3.className = "price";
  td3.innerHTML = carProducts[i].price;
  tr.appendChild(td3);

  var td4 = document.createElement("td");
  td4.style.border = "1px solid rgb(219, 211, 211)"
  var minusBtn = document.createElement("input");
  minusBtn.className = "plus-minus btn-style";
  minusBtn.type = "button";
  minusBtn.value = "-";
  td4.appendChild(minusBtn);
  var span = document.createElement("span");
  span.className = "nums"
  span.innerHTML = carProducts[i].count;
  span.style.margin = "0 5px";
  td4.appendChild(span);
  var plusBtn = document.createElement("input");
  plusBtn.className = "plus-minus btn-style";
  plusBtn.type = "button";
  plusBtn.value = "+";
  td4.appendChild(plusBtn);
  tr.appendChild(td4);

  var td5 = document.createElement("td");
  td5.style.border = "1px solid rgb(219, 211, 211)"
  td5.className = "total";
  var value = carProducts[i].price * carProducts[i].count;
  td5.innerHTML= value;
  tr.appendChild(td5);

  tbody.appendChild(tr);
}

var tr = document.createElement("tr");
var td = document.createElement("td");
td.style.border = "1px solid rgb(219, 211, 211)"
var span = document.createElement("span");
span.innerHTML = "全选";
span.style.marginRight = "5px";
td.appendChild(span);
var input = document.createElement("input");
input.className = "checkAll"
input.type = "checkbox";
td.appendChild(input);
tr.appendChild(td);

var td = document.createElement("td");
tr.appendChild(td);
var td = document.createElement("td");
td.className = "message";
td.innerHTML = "共计3件商品，210￥";
tr.appendChild(td);
var td = document.createElement("td");
tr.appendChild(td);
var td = document.createElement("td");
tr.appendChild(td);
tbody.appendChild(tr);

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
var check = document.querySelectorAll(".check");
for (var i = 0, lens = check.length; i < lens; i++) {
  check[i].addEventListener("click", function() {
    var flag = true;
    for (var j = 0, lens = check.length; j < lens; j++) {
      if (!check[j].checked) {
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