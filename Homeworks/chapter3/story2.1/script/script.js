var userName = document.getElementById('user-name');
var pwd = document.getElementById("pwd");

function getFocus() {
  if (this.value === "Please enter password") {
    this.value = "";
    this.type = "password";
  }

  if (this.value === "Please enter user name") {
    this.value = "";
  }

  this.style.color = "#000000";
}

function loseFocus() {
  if (this.value === "") {
    this.value = "Please enter user name";
  }
  this.style.color = "#a09c9c"
}

userName.addEventListener("focus", getFocus);
userName.addEventListener("blur", loseFocus);
pwd.addEventListener("focus", getFocus);
pwd.addEventListener("blur", loseFocus);

var btn = document.querySelector("button");
var message = document.querySelector(".message");

function getClick() {
  if (userName.value === "123" && pwd.value === "123") {
    message.className = "message right";
    message.innerHTML = "log in...";
  } else {
    message.className = "message wrong";
    message.innerHTML = "Please enter right account and password";
    pwd.value = "";
  }
}

btn.addEventListener('click', getClick);
