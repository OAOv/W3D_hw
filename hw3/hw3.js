var scene, renderer, camera;
var wall, chair, lights, ceiling, spotLights, pictures;
var paintingIntroduction = [];
var paintingView = [];
var meshPos = [];
var pickables = [];
var PI = Math.PI;
var ww = $('#gallery').innerWidth();
var hh = $('#gallery').innerHeight();
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

var sScene = [], sRenderer = [], sCamera = [];
var scP = [[-200, 100, 150],
  [-200, 100, -150],
  [-50, 100, -40],
  [200, 100, -150],
  [200, 100, 0],
  [200, 100, 150]
];
var scI = [[-142, 45, 0],
  [-100, 70, -120],
  [-140, 30, 150],
  [145, 30, 0],
  [160, 45, 150],
  [-130, 0, 40]
];
var scF = [[145, -15, 30],
  [-160, 55 ,0],
  [140, 10, 150],
  [-40, -15, -80],
  [-150, 0, 30],
  [150, -5, 0]
];
var curAt = [];
var sign = 1;

var clock = new THREE.Clock();
var T = 15;
var ts = clock.getElapsedTime();
var keys = [
  [0, scI],
  [0.45, scF],
  [0.5, scF],
  [0.95, scI],
  [1, scI]
];

class Wall {
  constructor() {
    let wallN = new THREE.Mesh(new THREE.BoxGeometry(400, 100, 20), new THREE.MeshPhongMaterial());
    wallN.position.set(0, 50, -160);
    scene.add(wallN);

    let wallE = new THREE.Mesh(new THREE.BoxGeometry(20, 100, 340), new THREE.MeshPhongMaterial());
    wallE.position.set(210, 50, 0);
    scene.add(wallE);

    let wallS1 = new THREE.Mesh(new THREE.BoxGeometry(120, 100, 20), new THREE.MeshPhongMaterial());
    wallS1.position.set(-140, 50, 160);
    scene.add(wallS1);

    let wallS2 = new THREE.Mesh(new THREE.BoxGeometry(230, 100, 20), new THREE.MeshPhongMaterial());
    wallS2.position.set(85, 50, 160);
    scene.add(wallS2);

    let wallS3 = new THREE.Mesh(new THREE.BoxGeometry(50, 20, 20), new THREE.MeshPhongMaterial());
    wallS3.position.set(-55, 90, 160);
    scene.add(wallS3);

    let wallW = new THREE.Mesh(new THREE.BoxGeometry(20, 100, 340), new THREE.MeshPhongMaterial());
    wallW.position.set(-210, 50, 0);
    scene.add(wallW);

    let wall1 = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 20), new THREE.MeshPhongMaterial());
    wall1.position.set(-160, 50, 0);
    scene.add(wall1);

    let wall2 = new THREE.Mesh(new THREE.BoxGeometry(20, 100, 120), new THREE.MeshPhongMaterial());
    wall2.position.set(-50, 50, -90);
    scene.add(wall2);

    let wall3 = new THREE.Mesh(new THREE.BoxGeometry(200, 100, 20), new THREE.MeshPhongMaterial());
    wall3.position.set(100, 50, 0);
    scene.add(wall3);

    let wall4 = new THREE.Mesh(new THREE.BoxGeometry(140, 100, 30), new THREE.MeshPhongMaterial());
    wall4.position.set(80, 50, 75);
    scene.add(wall4);
  }
}

class Chair {
  constructor() {
    let chair = new THREE.Mesh(new THREE.BoxGeometry(120, 10, 50), new THREE.MeshPhongMaterial({
      color: 0x000000
    }));
    chair.position.set(75, 40, -75);
    scene.add(chair);

    let chairL = new THREE.Mesh(new THREE.BoxGeometry(5, 35, 50), new THREE.MeshPhongMaterial());
    chairL.position.set(120, 17.5, -75);
    scene.add(chairL);

    let chairR = new THREE.Mesh(new THREE.BoxGeometry(5, 35, 50), new THREE.MeshPhongMaterial());
    chairR.position.set(35, 17.5, -75);
    scene.add(chairR);
  }
}

class Light {
  constructor() {
    this.lights = [];
    this.num = 8
    var light;
    var pos = [
      [-140, 100, -80],
      [40, 100, -80],
      [120, 100, -80],
      [90, 100, 37.5],
      [180, 100, 80],
      [90, 100, 112.5],
      [-40, 100, 80],
      [-160, 100, 80]
    ];

    for (var i = 0; i < this.num; i++) {
      light = new THREE.PointLight(0xffffff, 0.4, 180);
      light.position.set(pos[i][0], pos[i][1], pos[i][2]);
      scene.add(light);
      this.lights.push(light);
    }
  }

  changeIntensity(val) {
    for (var i = 0; i < this.num; i++) {
      this.lights[i].intensity = val;
    }
  }
}

class SpotLight {
  constructor() {
    this.spotLights = [];
    this.num = 21;
    var lamp, mesh, lampbody, spotLight;
    var lampPos = [
      [20, 115, 10],
      [135, 115, 10],
      [20, 115, 60],
      [135, 115, 60],
      [145, 115, 80],
      [20, 115, 90],
      [135, 115, 90],
      [20, 115, 150],
      [135, 115, 150],
      [-140, 115, 150],
      [-140, 115, 10],
      [-200, 115, -100],
      [-150, 115, -80],
      [-110, 115, -80],
      [-60, 115, -100],
      [10, 115, -80],
      [30, 115, -80],
      [60, 115, -80],
      [90, 115, -80],
      [120, 115, -80],
      [140, 115, -80]
    ];
    meshPos = [
      [45, 60, 60],
      [115, 60, 60],
      [40, 60, 10],
      [130, 60, 10],
      [200, 60, 75],
      [40, 60, 150],
      [130, 60, 150],
      [45, 60, 90],
      [115, 60, 90],
      [-200, 60, 110],
      [-200, 60, 50],
      [-130, 60, -150],
      [-200, 60, -75],
      [-60, 60, -90],
      [-130, 60, -150],
      [-40, 60, -90],
      [-5, 60, -150],
      [50, 60, -150],
      [105, 60, -150],
      [160, 60, -150],
      [200, 60, -75]
    ];

    for (var i = 0; i < this.num; i++) {
      lamp = new THREE.Object3D();
      lampbody = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 10), new THREE.MeshBasicMaterial({
        color: 0x000000
      }));
      lamp.add(lampbody);
      lampbody.position.set(0, 0, 15);
      lampbody.rotation.x = Math.PI / 2;
      lamp.position.set(lampPos[i][0], lampPos[i][1], lampPos[i][2]);
      scene.add(lamp);

      mesh = new THREE.Mesh(new THREE.SphereGeometry(10, 20, 20), new THREE.MeshPhongMaterial({
        color: 0xf9ff91
      }));
      mesh.position.set(meshPos[i][0], meshPos[i][1], meshPos[i][2]);
      mesh.visible = false;
      scene.add(mesh);

      spotLight = new THREE.SpotLight(0xffffff);
      scene.add(spotLight);
      spotLight.position.copy(lamp.position);

      spotLight.angle = 0.8;
      spotLight.penumbra = 0.4;
      spotLight.distance = 120;
      spotLight.decay = 1;
      spotLight.intensity = 2;
      spotLight.target = mesh;
      lamp.lookAt(mesh.position);
      this.spotLights.push(spotLight);
    }
  }

  changeIntensity(val) {
    for (var i = 0; i < this.num; i++) {
      this.spotLights[i].intensity = val * 0.8;
    }
  }
}

class Picture {
  constructor() {
    var paintingPos = [
      [45, 60, 59],
      [115, 60, 59],
      [40, 60, 11],
      [130, 60, 11],
      [199, 60, 75],
      [40, 60, 149],
      [130, 60, 149],
      [45, 60, 91],
      [115, 60, 91],
      [-199, 60, 115],
      [-199, 60, 50],
      [-157, 60, -149],
      [-199, 60, -75],
      [-61, 60, -90],
      [-103, 60, -149],
      [-39, 60, -90],
      [-5, 60, -149],
      [50, 60, -149],
      [105, 60, -149],
      [160, 60, -149],
      [199, 60, -75]
    ];
    var paintingRotation = [
      [0, PI, 0],
      [0, PI, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, -PI / 2, 0],
      [0, PI, 0],
      [0, PI, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, PI / 2, 0],
      [0, PI / 2, 0],
      [0, 0, 0],
      [0, PI / 2, 0],
      [0, -PI / 2, 0],
      [0, 0, 0],
      [0, PI / 2, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, -PI / 2, 0]
    ];
    var paintingName = [
      "ZhenWu",
      "TaiBai",
      "TianShiang",
      "GaiBang",
      "YiHua",
      "ShenWei",
      "ShenDau",
      "WuDu",
      "TangMen",
      "MingYueShin",
      "GungTzYu",
      "KaiFeng",
      "HangJou",
      "HaiHeJou",
      "KaiFeng",
      "YanNanFei",
      "YaJrChiou",
      "ChiuWuYi",
      "TangChingFeng",
      "LiYuTang",
      "FuYe"
    ];
    var paintingLoad = [
      "https://i.imgur.com/oPvs1EI.jpg",
      "https://i.imgur.com/gnyCArh.jpg",
      "https://i.imgur.com/gY645B8.jpg",
      "https://i.imgur.com/koPpCtb.jpg",
      "https://i.imgur.com/brfjiP5.jpg",
      "https://i.imgur.com/je8bpXs.jpg",
      "https://i.imgur.com/rEj3jil.jpg",
      "https://i.imgur.com/5wi3NBz.jpg",
      "https://i.imgur.com/LhpyIPc.jpg",
      "https://i.imgur.com/uebYNDK.jpg",
      "https://i.imgur.com/r5IMyNg.png",
      "https://i.imgur.com/xFbgded.jpg",
      "https://i.imgur.com/90R5UYB.png?1",
      "https://i.imgur.com/Rv37ZA8.jpg?1",
      "https://i.imgur.com/o4qQJzd.jpg",
      "https://i.imgur.com/bvU34vq.jpg?1",
      "https://i.imgur.com/3TkDGOh.jpg?1",
      "https://i.imgur.com/USpzGtC.jpg?1",
      "https://i.imgur.com/XiNP44s.jpg?1",
      "https://i.imgur.com/T1608wg.jpg?1",
      "https://i.imgur.com/J7w91hN.jpg?1"
    ];
    paintingIntroduction = [
      "真武(ZhenWu), 靈妙潛通乘風起，太極玄虛若鏡清",
      "太白(TaiBai), 流星白羽光出匣，一劍無痕雪漫山",
      "天香(TianShiang), 競誇天下雙無絕，獨立人間第一香",
      "丐幫(GaiBang), 醉來豪氣不可收，噓作長虹貫牛斗",
      "移花宮(YiHua), 醒來忘卻移花處，誰自臨風吹玉笛",
      "神威(ShenWei), 神威倒捲翻空浪，一舉沖霄氣勢雄",
      "神刀(ShenDau), 刀含煞氣騰幽朔，蕭颯寒芒泣鬼神",
      "五毒(WuDu), 動游碧落心無礙，靜藏深淵跡絕踪",
      "唐門(TangMen), 霧靄雲從飛星落，半影相依扇中情",
      "明月心(MingYueShin) 青龍會的二龍首",
      "公子羽(GungTzYu), 青龍會的龍首",
      "開封(KaiFeng)",
      "杭州(HangJou)",
      "海河洲(HaiHeJou)",
      "開封(KaiFeng)",
      "燕南飛(YanNanFei), 在下燕南飛，燕子的燕，不是孤雁的雁",
      "葉知秋(YaJrChiou), 何謂俠義?何謂魔道?成王敗寇而已。",
      "曲無憶(ChiuWuYi), 杜鵑莫遺春風拂，長恨佳人誤，去了還來知幾度？多情山色，有情江水，笑我歸無處。",
      "唐青楓(TangChingFeng), 真羨慕那些不用開會的人......",
      "離玉堂(LiYuTang), 如履薄冰，如臨深淵。方能運籌帷幄，料敵機先。",
      "傅紅雪&葉開(FuYe), 好兄弟"
    ];
    paintingView = [
      [40, 60, 11],
      [130, 60, 11],
      [50, 60, 50],
      [115, 60, 59],
      [145, 60, 80],
      [50, 60, 80],
      [130, 60, 80],
      [40, 60, 149],
      [130, 60, 149],
      [-100, 60, 120],
      [-100, 60, 50],
      [-130, 60, -40],
      [-140, 60, -75],
      [-120, 60, -90],
      [-130, 60, -40],
      [10, 60, -90],
      [-5, 60, -95],
      [50, 60, -95],
      [105, 60, -95],
      [160, 60, -95],
      [140, 60, -90]
    ];

    var loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    var tex, painting;

    for (var i = 0; i < 21; i++) {
      tex = loader.load(paintingLoad[i]);

      painting = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshPhongMaterial({
        map: tex
      }));
      scene.add(painting);
      painting.position.set(paintingPos[i][0], paintingPos[i][1], paintingPos[i][2]);
      painting.rotation.set(paintingRotation[i][0], paintingRotation[i][1], paintingRotation[i][2]);
      painting.name = paintingName[i];
      pickables.push(painting);
    }
  }
}

init();
animate();

function init() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(ww, hh);
  renderer.setClearColor(0xa4adbc);
  $('#gallery').append(renderer.domElement);

  camera = new THREE.PerspectiveCamera(50, ww / hh, 1, 1000);
  camera.position.y = 700;
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  var gridXZ = new THREE.GridHelper(400, 20, 'red', 'white');
  //scene.add(gridXZ);

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousedown', onDocumentMouseDown, false);

  //////////////////////////////////////////////////////////////////////////////

  let loader = new THREE.TextureLoader();
  loader.crossOrigin = '';
  texture = loader.load('https://i.imgur.com/7Cvwug4.jpg?1');
  texture.repeat.set(3, 3);
  texture.wrapS = texture.wrapT = true;

  let floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 300), new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: texture
  }))
  scene.add(floor)
  floor.rotation.x = -Math.PI / 2

  /////////////////////////////////////////

  walls = new Wall();
  chair = new Chair();
  lights = new Light();
  ceiling = new THREE.Mesh(new THREE.PlaneGeometry(400, 300), new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.2
  }));
  scene.add(ceiling);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 101;

  ////////////////////////////////////////
  spotLights = new SpotLight();
  pictures = new Picture();
  ////////////////////////////////////////

  setSurveillanceCamera();
}

function setSurveillanceCamera() {
  for(var i = 0; i < 6; i++) {
    sScene.push(new THREE.Scene());
    sRenderer.push(new THREE.WebGLRenderer({antialias: true}));

    var sww = $('#sur' + i).innerWidth();
    var shh = $('#sur' + i).innerHeight();
    sRenderer[i].setSize(sww, shh);
    sRenderer[i].setClearColor(0xffffff);
    $('#sur' + i).append(sRenderer[i].domElement);

    sCamera.push(new THREE.PerspectiveCamera(40, sww / shh, 1, 1000));
    sCamera[i].position.set(scP[i][0], scP[i][1], scP[i][2]);
    sCamera[i].lookAt(new THREE.Vector3(scI[i][0], scI[i][1], scI[i][2]));
    curAt.push(scI[i].slice());

    //var helper = new THREE.CameraHelper( sCamera[i] );
    //scene.add( helper );
  }
}

function onWindowResize() {
  ww = $('#gallery').innerWidth();
  hh = $('#gallery').innerHeight();
  camera.aspect = ww / hh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, hh);

  for(var i = 0; i < 6; i++) {
    var sww = $('#sur' + i).innerWidth();
    var shh = $('#sur' + i).innerHeight();
    sCamera[i].aspect = sww / shh;
    sCamera[i].updateProjectionMatrix();
    sRenderer[i].setSize(sww, shh);
  }
}

function onDocumentMouseDown(event) {
  var viewportPos =$('#gallery').get(0).getBoundingClientRect(); 
  mouse.x = ((event.clientX - viewportPos.left) / $('#gallery').innerWidth()) * 2 - 1;
  mouse.y = -((event.clientY - viewportPos.top) / $('#gallery').innerHeight()) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects (pickables);
  if (intersects.length > 0) {
    for(var i = 0; i < 21; i++)
      if(intersects[0].object.name == pickables[i].name) {
        document.getElementById("info").innerHTML = paintingIntroduction[i];
        camera.position.set(paintingView[i][0], paintingView[i][1], paintingView[i][2]);
        camera.lookAt(new THREE.Vector3(meshPos[i][0], meshPos[i][1], meshPos[i][2]));
      }
  }
}

function keyframe(t) {
  var s = ((t - ts) % T) / T;

  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }

  var ii = i - 1;
  console.log(ii);
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);

  for(var j = 0; j < 6; j++) {
    sCamera[j].lookAt(new THREE.Vector3(
      keys[ii][1][j][0]*(1-a) + keys[ii+1][1][j][0]*a,
      keys[ii][1][j][1]*(1-a) + keys[ii+1][1][j][1]*a,
      keys[ii][1][j][2]*(1-a) + keys[ii+1][1][j][2]*a) 
    );
    console.log(keys[ii][1][j][0]*(1-a) + keys[ii+1][1][j][0]*a);
  }
}

function animate() {
  /*var tmpX, tmpY, tmpZ;
  for(var i = 0; i < 6; i++) {
    tmpX = (scF[i][0] - scI[i][0]) / 300;
    tmpY = (scF[i][1] - scI[i][1]) / 300;
    tmpZ = (scF[i][2] - scI[i][2]) / 300;

    if(curAt[i][1] <= scF[i][1])
      sign = -1;
    else if(curAt[i][1] >= scI[i][1])
      sign = 1;

    curAt[i][0] += tmpX * sign;
    curAt[i][1] += tmpY * sign;
    curAt[i][2] += tmpZ * sign;
    sCamera[i].lookAt(new THREE.Vector3(curAt[i][0], curAt[i][1], curAt[i][2]));
  }*/

  keyframe(clock.getElapsedTime());

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  for(var i = 0; i < 6; i++)
    sRenderer[i].render(scene, sCamera[i]);
}
