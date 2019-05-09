var rec, recCtx, cir, cirCtx, rad;
var recX, recY;
var cirX, cirY, dirX, dirY;
var mouse = new THREE.Vector2();

function draw() {
  console.log("draw!");

  rec = document.getElementById('rectangle');
  if(rec.getContext) {
    console.log("rectangle");
    recCtx = rec.getContext('2d');

    recCtx.fillStyle = "#48556b";
    recCtx.fillRect(0, 0, 150, 60);
    rec.style.position = "absolute";
    rec.style.left = "200px";
    rec.style.top = "410px";
    recX = 125;
    recY = 380;
  }

  cir = document.getElementById('circle');
  if(cir.getContext) {
    console.log("circle");
    cirCtx = cir.getContext('2d');

    cirCtx.beginPath();
    cirCtx.arc(cirX = Math.random() * 450 + 50, cirY = Math.random() * 450 +50, 50, 0, 2*Math.PI);
    rad = 50;
    cirCtx.lineWidth = 3;
    cir.style.position = "absolute";
    cirCtx.strokeStyle = "#FF0000";
    cirCtx.stroke();
  }

  dirX = dirY = 1;

  animate();
}

init();

function init() {
  var dis = document.getElementById('display');
  if(dis) {
    window.addEventListener('load', function(){
      dis.addEventListener('mousedown', onDocumentMouseDown, false);
    });
  }
}

function animate() {
  //requestAnimationFrame(animate);

  cirCtx.clearRect(0, 0, 550, 550);
  cirCtx.beginPath();
  cirCtx.arc(cirX += dirX, cirY += dirY, rad, 0, 2*Math.PI);
  cirCtx.stroke();

  if (cirX > 550 - rad || cirX < rad) {
    dirX *= -1;
  }
  else if (cirY > 550 - rad || cirY < rad) {
    dirY *= -1;
  }
}

$('#radius').change(function() {
  console.log($(this).val());
  rad = $(this).val();
  cirCtx.clearRect(0, 0, 550, 550);
  cirCtx.beginPath();
  cirCtx.arc(cirX, cirY, rad, 0, 2*Math.PI);
  cirCtx.stroke();
})

function onDocumentMouseDown(event) {
  console.log("x: " + event.clientX + ", y: " + event.clientY);
  rec.style.left = (event.clientX - 30 - 75);
  rec.style.top = (event.clientY - 85 - 30);
  recX = rec.style.left - 75;
  recY = rec.style.top - 30;
}

/////////////////////////////////////////////////////

function getPos () {
  // Call api 
  // Need to be replaced by a public ip address
  $.get( "http://127.0.0.1:1337/api?Rx=" + recX + "&Ry=" + recY + "&Rw=150&Rh=60&Cx=" + cirX + "&Cy=" + cirY + "rad=" + rad, function( data ) {
  });
}

var render = function () {
  requestAnimationFrame( render );

  //getPos(); // should use setInterval (unless the Shell does not respond as fast
  animate();
};
render();
