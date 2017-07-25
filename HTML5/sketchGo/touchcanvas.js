// Script based on https://github.com/cheeaun/3d-touch-canvas
function distanceBetween(point1, point2){
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2){
  return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

var el = document.getElementById('c');
var ctx = el.getContext('2d');
var scaleFactor = window.devicePixelRatio || 1;

if (scaleFactor > 1){
  el.width = el.offsetWidth * scaleFactor;
  el.height = el.offsetHeight * scaleFactor;
  ctx.scale(scaleFactor, scaleFactor);
}
ctx.lineJoin = ctx.lineCap = 'round';
var isDrawing, lastPoint;

el.addEventListener("touchstart", function(e){
  e.preventDefault();
  isDrawing = true;
  lastPoint = { x: e.touches[0].clientX-el.offsetLeft, y: e.touches[0].clientY-el.offsetTop };
});
var rectSize = 60;
el.addEventListener("touchmove", function(e){
  if (!isDrawing) return;
  var currentPoint = { x: e.touches[0].clientX-el.offsetLeft, y: e.touches[0].clientY-el.offsetTop };
  var dist = distanceBetween(lastPoint, currentPoint);
  var angle = angleBetween(lastPoint, currentPoint);
  var force = e.touches[0].force;
  for (var i = 0; i < dist; i++){
    var x = lastPoint.x + (Math.sin(angle) * i);
    var y = lastPoint.y + (Math.cos(angle) * i);
    var radgrad = ctx.createRadialGradient(x,y,0,x,y,rectSize/3*(force+0.2));
    radgrad.addColorStop(0, '#000');
    radgrad.addColorStop(0.3, 'rgba(0,0,0,0.5)');
    radgrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radgrad;
    ctx.fillRect(x-rectSize/2, y-rectSize/2, rectSize, rectSize);
  }
  lastPoint = currentPoint;
});
el.addEventListener("touchend", function(){
  isDrawing = false;
});
el.addEventListener("touchcancel", function(){
  isDrawing = false;
});

function clearSketch() {
  ctx.clearRect(0, 0, el.width, el.height);
}

function getBase64Image() {
    return el.toDataURL();

}