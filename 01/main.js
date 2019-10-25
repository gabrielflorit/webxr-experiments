import * as THREE from './../node_modules/three/build/three.module.js'

// To display anything, we need three things:
// - scene
// - camera
// - renderer, to render the scene with camera

const canvas = document.querySelector('canvas')

// Create the scene.
const scene = new THREE.Scene()

// Create the camera.
const fov = 75
const aspect = window.innerWidth / window.innerHeight
console.log(aspect)
const near = 0.1
const far = 5
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 2

// Add a light.
{
  const color = 0xffffff
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)
}

const addMeshAtX = (geometry, color, x) => {
  const material = new THREE.MeshPhongMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  mesh.position.x = x
  return mesh
}

const cube = new THREE.BoxGeometry(1, 1, 1)

// Add cubes to the scene.
const cubes = [[0x44aa88, 0], [0x8844aa, -2], [0xaa8844, 2]].map(([color, x]) =>
  addMeshAtX(cube, color, x)
)

// Create the renderer.
const renderer = new THREE.WebGLRenderer({ canvas })
document.body.appendChild(renderer.domElement)

// This helper function calls itself every tick, using rAF.
const render = milliseconds => {
  const seconds = milliseconds * 0.001

  cubes.forEach((cube, i) => {
    cube.rotation.x = seconds
    cube.rotation.y = seconds
  })

  // Render the scene.
  renderer.render(scene, camera)

  // Call rAF.
  requestAnimationFrame(render)
}

requestAnimationFrame(render)
