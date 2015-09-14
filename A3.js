/**
 * UBC CPSC 314, Vjan2015
 * Assignment 3 Template
 */

var scene = new THREE.Scene();

// SETUP RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var aspect = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 10000);
camera.position.set(10,15,40);
camera.lookAt(scene.position); 
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

// FLOOR WITH CHECKERBOARD 
var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(30, 30);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// LIGHTING UNIFORMS
var lightColor = new THREE.Color(1,1,1);
var ambientColor = new THREE.Color(0.4,0.4,0.4);
var lightPosition = new THREE.Vector3(70,100,70);
var diffuseColour = new THREE.Vector3(1,1,1);

// MATERIALS
var defaultMaterial = new THREE.MeshLambertMaterial();

var gouraudMatrial      = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
	 diffuseColour : {type: 'v3', value: diffuseColour},
   },
});

var phongMatrial      = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
	 diffuseColour : {type: 'v3', value: diffuseColour},
   },
});

var blinnphongMatrial = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
	 diffuseColour : {type: 'v3', value: diffuseColour},
   },
});

var toonMatrial = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
	 diffuseColour : {type: 'v3', value: diffuseColour},
   },
});


var armadilloMaterial = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
   },
});

// LOAD SHADERS
var shaderFiles = [
  'glsl/example.vs.glsl',
  'glsl/example.fs.glsl',
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/example.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/example.fs.glsl'];
  armadilloMaterial.needsUpdate = true;
})

//----------------gouraud----------------
var gouraudShaderFiles = [
  'glsl/gouraud.vs.glsl',
  'glsl/gouraud.fs.glsl',
];

new THREE.SourceLoader().load(gouraudShaderFiles, function(shaders) {
  gouraudMatrial.vertexShader = shaders['glsl/gouraud.vs.glsl'];
  gouraudMatrial.fragmentShader = shaders['glsl/gouraud.fs.glsl'];
  gouraudMatrial.needsUpdate = true;
})

//----------------phong----------------
var phongShaderFiles = [
  'glsl/phong.vs.glsl',
  'glsl/phong.fs.glsl',
];

new THREE.SourceLoader().load(phongShaderFiles, function(shaders) {
  phongMatrial.vertexShader = shaders['glsl/phong.vs.glsl'];
  phongMatrial.fragmentShader = shaders['glsl/phong.fs.glsl'];
  phongMatrial.needsUpdate = true;
})


//----------------Blinn-Phong----------------
var blinnphongShaderFiles = [
  'glsl/blinnphong.vs.glsl',
  'glsl/blinnphong.fs.glsl',
];

new THREE.SourceLoader().load(blinnphongShaderFiles, function(shaders) {
  blinnphongMatrial.vertexShader = shaders['glsl/blinnphong.vs.glsl'];
  blinnphongMatrial.fragmentShader = shaders['glsl/blinnphong.fs.glsl'];
  blinnphongMatrial.needsUpdate = true;
})

//----------------toon----------------
var toonShaderFiles = [
  'glsl/toon.vs.glsl',
  'glsl/toon.fs.glsl',
];

new THREE.SourceLoader().load(toonShaderFiles, function(shaders) {
  toonMatrial.vertexShader = shaders['glsl/toon.vs.glsl'];
  toonMatrial.fragmentShader = shaders['glsl/toon.fs.glsl'];
  toonMatrial.needsUpdate = true;
})


// LOAD ARMADILLO
function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader()
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.parent = floor;
    scene.add(object);

  }, onProgress, onError);
}

loadOBJ('obj/armadillo.obj', armadilloMaterial, 3, 0,3,-2, 0,Math.PI,0);

// CREATE SPHERES
var sphere = new THREE.SphereGeometry(1, 32, 32);
var gem_gouraud = new THREE.Mesh(sphere, gouraudMatrial); // tip: make different materials for each sphere
gem_gouraud.position.set(-3, 1, -1);
scene.add(gem_gouraud);
gem_gouraud.parent = floor;

var gem_phong = new THREE.Mesh(sphere, phongMatrial);
gem_phong.position.set(-1, 1, -1);
scene.add(gem_phong);
gem_phong.parent = floor;

var gem_phong_blinn = new THREE.Mesh(sphere, blinnphongMatrial);
gem_phong_blinn.position.set(1, 1, -1);
scene.add(gem_phong_blinn);
gem_phong_blinn.parent = floor;

var gem_toon = new THREE.Mesh(sphere, toonMatrial);
gem_toon.position.set(3, 1, -1);
scene.add(gem_toon);
gem_toon.parent = floor;

// SETUP UPDATE CALL-BACK
var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("1")){
	  //armadilloMaterial = phongMaterial;
	  new THREE.SourceLoader().load(gouraudShaderFiles, function(shaders) {
		    armadilloMaterial.vertexShader = shaders['glsl/gouraud.vs.glsl'];
			armadilloMaterial.fragmentShader = shaders['glsl/gouraud.fs.glsl'];
			armadilloMaterial.needsUpdate = true;
	  });
  }
  
  if (keyboard.pressed("2")){
	  //armadilloMaterial = phongMaterial;
	  new THREE.SourceLoader().load(phongShaderFiles, function(shaders) {
		    armadilloMaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
			armadilloMaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];
			armadilloMaterial.needsUpdate = true;
	  });
  }
  
   if (keyboard.pressed("3")){
	  //armadilloMaterial = phongMaterial;
	  new THREE.SourceLoader().load(blinnphongShaderFiles, function(shaders) {
		    armadilloMaterial.vertexShader = shaders['glsl/blinnphong.vs.glsl'];
			armadilloMaterial.fragmentShader = shaders['glsl/blinnphong.fs.glsl'];
			armadilloMaterial.needsUpdate = true;
	  });
  }
  
   if (keyboard.pressed("4")){
	  //armadilloMaterial = phongMaterial;
	  new THREE.SourceLoader().load(toonShaderFiles, function(shaders) {
		    armadilloMaterial.vertexShader = shaders['glsl/toon.vs.glsl'];
			armadilloMaterial.fragmentShader = shaders['glsl/toon.fs.glsl'];
			armadilloMaterial.needsUpdate = true;
	  });
  }
  
  armadilloMaterial.needsUpdate = true; // Tells three.js that some uniforms might have changed

}
var render = function() {
 // tip: change armadillo shading here according to keyboard
 checkKeyboard();
 requestAnimationFrame(render);
 renderer.render(scene, camera);
}

render();