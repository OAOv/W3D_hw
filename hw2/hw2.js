var scene, renderer;
var useCamera;
var camera, camera1, camera2, camera3, camera4;
var wall, chair, lights, ceiling, spotLights;

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
      [90, 100, 30],
      [180, 100, 80],
      [90, 100, 125],
      [-40, 100, 80],
      [-160, 100, 80]
    ];

    for (var i = 0; i < this.num; i++) {
      light = new THREE.PointLight(0xffffff, 0, 180);
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
      [80, 100, 10],
      [85, 100, 10],
      [80, 100, 60],
      [85, 100, 60],
      [145, 100, 80],
      [80, 100, 90],
      [85, 100, 90],
      [80, 100, 150],
      [85, 100, 150],
      [-140, 100, 150],
      [-140, 100, 10],
      [-200, 100, -100],
      [-170, 100, -150],
      [-90, 100, -150],
      [-60, 100, -100],
      [20, 100, -80],
      [40, 100, -80],
      [60, 100, -80],
      [80, 100, -80],
      [100, 100, -80],
      [120, 100, -80]
    ];
    var meshPos = [
      [40, 60, 60],
      [130, 60, 60],
      [40, 60, 10],
      [130, 60, 10],
      [200, 60, 75],
      [40, 60, 150],
      [130, 60, 150],
      [40, 60, 90],
      [130, 60, 90],
      [-200, 60, 110],
      [-200, 60, 50],
      [-150, 60, -150],
      [-200, 60, -75],
      [-60, 60, -90],
      [-100, 60, -150],
      [-40, 60, -90],
      [0, 60, -150],
      [50, 60, -150],
      [100, 60, -150],
      [150, 60, -150],
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
      scene.add(mesh);

      spotLight = new THREE.SpotLight(0xffffff);
      scene.add(spotLight);
      spotLight.position.copy(lamp.position);

      spotLight.angle = 0.8;
      spotLight.penumbra = 0.4;
      spotLight.distance = 120;
      spotLight.decay = 1;
      spotLight.intensity = 0;
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

$('#intensity').change(function() {
  console.log($(this).val());
  lights.changeIntensity($(this).val());
  spotLights.changeIntensity($(this).val());
})

function toggleCamera(val) {
  if (val == 0)
    useCamera = camera;
  else if (val == 1)
    useCamera = camera1;
  else if (val == 2)
    useCamera = camera2;
  else if (val == 3)
    useCamera = camera3;
  else if (val == 4)
    useCamera = camera4;
}

init();
animate();

function init() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xa4adbc);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.y = 700;
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  var gridXZ = new THREE.GridHelper(400, 20, 'red', 'white');
  //scene.add(gridXZ);

  window.addEventListener('resize', onWindowResize, false);

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
  ////////////////////////////////////////

  useCamera = camera;

  camera1 = new THREE.PerspectiveCamera(60, 1, 1, 1000);
  camera1.position.set(300, 500, 0);
  camera1.lookAt(new THREE.Vector3(0, 60, 0));

  camera2 = new THREE.PerspectiveCamera(60, 1, 1, 1000);
  camera2.position.set(-300, 500, 0);
  camera2.lookAt(new THREE.Vector3(0, 60, 0));

  camera3 = new THREE.PerspectiveCamera(60, 1, 1, 1000);
  camera3.position.set(0, 500, 300);
  camera3.lookAt(new THREE.Vector3(0, 60, 0));

  camera4 = new THREE.PerspectiveCamera(60, 1, 1, 1000);
  camera4.position.set(0, 500, -300);
  camera4.lookAt(new THREE.Vector3(0, 60, 0));
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, useCamera);
}
