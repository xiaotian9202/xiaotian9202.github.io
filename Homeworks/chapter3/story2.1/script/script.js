
function getCursor() {
  if (this.value === "Please enter password") {
    this.type = "password";
  }
  this.value = "";
  this.style.color = "#000000";
}

function loseCursor() {
  if (this.type === "text" && this.value === "") {
    this.value = "Please enter user name";
  } else if (this.type === "password" && this.value === "") {
    this.type = "text";
    this.value = "Please enter password";
  }
  this.style.color = "#a09c9c";
}

// The operation of submit
function submitInfo() {
  var message = document.querySelector(".message");
  if (userName.value === "123" && pwd.value === "123") {
    message.className = "message right";
    message.innerHTML = "log in...";
  } else {
    message.className = "message wrong";
    message.innerHTML = "Please enter right account and password";
    pwd.value = "";
  }
}

var userName = document.getElementById('user-name');
userName.addEventListener("focus", getCursor);
userName.addEventListener("blur", loseCursor);

var password = document.getElementById("pwd");
password.addEventListener("focus", getCursor);
password.addEventListener("blur", loseCursor);

var btn = document.querySelector("button");
btn.addEventListener('click', submitInfo);
