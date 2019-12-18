
var greenBox = document.querySelector(".green-box");
var yellowBox = document.querySelector(".yellow-box");
var document = document.querySelector(".big-box");
var flag = false;
var x = 0;
var y = 0;
document.addEventListener("mousemove", move);

greenBox.addEventListener("mousedown", function (e) {
  flag = true;
  x = e.pageX - greenBox.offsetLeft;
  y = e.pageY - greenBox.offsetTop;
})

document.addEventListener("mouseup", function () {
  flag = false;
})

function move(e) {
  if (flag) {
    if (e.pageX - x < 0) {
      greenBox.style.left = "0px";
      if (e.pageY - y < 0) {
        greenBox.style.top = "0px";
      } else if (e.pageY - y > 720) {
        greenBox.style.top = "720px";
      } else {
        greenBox.style.top = e.pageY - y + "px"
      }
    } else if (e.pageX - x > 920) {
      greenBox.style.left = "920px";
      if (e.pageY - y < 0) {
        greenBox.style.top = "0px";
      } else if (e.pageY - y > 720) {
        greenBox.style.top = "720px";
      } else {
        greenBox.style.top = e.pageY - y + "px"
      }
    } else if (e.pageY - y < 0) {
      greenBox.style.top = "0px";
      if (e.pageX - x < 0) {
        greenBox.style.left = "0px";
      } else if (e.pageX - x > 920) {
        greenBox.style.left = "920px";
      } else {
        greenBox.style.left = e.pageX - x + "px"
      }
    } else if (e.pageY - y > 720) {
      greenBox.style.top = "720px";
      if (e.pageX - x < 0) {
        greenBox.style.left = "0px";
      } else if (e.pageX - x > 920) {
        greenBox.style.left = "920px";
      } else {
        greenBox.style.left = e.pageX - x + "px"
      }
    } else {
      greenBox.style.left = e.pageX - x + "px"
      greenBox.style.top = e.pageY - y + "px"
      if (e.pageX - x > 740
        && e.pageX - x < 900
        && e.pageY - y > 540
        && e.pageY - y < 700) {
        yellowBox.style.backgroundColor = "blue";
      } else {
        yellowBox.style.backgroundColor = "yellow";
      }
    }
  }
}