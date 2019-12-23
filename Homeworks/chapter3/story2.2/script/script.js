var greenBox = document.querySelector(".green-box");
var yellowBox = document.querySelector(".yellow-box");
var bigBox = document.querySelector(".big-box");
var maxGreenBoxOffsetLeft = bigBox.clientWidth - greenBox.clientWidth;
var maxGreenBoxOffsetTop = bigBox.clientHeight - greenBox.clientHeight;
var flag = false;
var x = 0;
var y = 0;

document.addEventListener("mousemove", moveGreenBox);
greenBox.addEventListener("mousedown", function (e) {
  flag = true;
  x = e.pageX - greenBox.offsetLeft;
  y = e.pageY - greenBox.offsetTop;
})
document.addEventListener("mouseup", function () {
  flag = false;
})

function moveGreenBox(e) {
  if (flag) {
   greenBox.style.left = Math.max(Math.min(e.pageX - x, maxGreenBoxOffsetLeft), 0) + "px";
   greenBox.style.top = Math.max(Math.min(e.pageY - y, maxGreenBoxOffsetTop), 0) + "px";
   changeColorOfYellowBox();
  }
}

function changeColorOfYellowBox() {
  var minLeft = yellowBox.offsetLeft - yellowBox.clientWidth;
  var maxLeft = yellowBox.offsetLeft + yellowBox.clientWidth;
  var minTop = yellowBox.offsetTop - yellowBox.clientHeight;
  var maxTop = yellowBox.offsetTop + yellowBox.clientHeight;
  console.log()
  if (greenBox.offsetLeft > minLeft 
    && greenBox.offsetLeft < maxLeft
    && greenBox.offsetTop > minTop
    && greenBox.offsetTop < maxTop) {
      yellowBox.style.backgroundColor = "rgb(15, 48, 233)";
  } else {
    yellowBox.style.backgroundColor = "rgb(233, 211, 15)";
  }
}