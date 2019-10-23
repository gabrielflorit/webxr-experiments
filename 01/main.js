import * as THREE from './../node_modules/three/build/three.module.js'

// To display anything, we need three things:
// - scene
// - camera
// - renderer, to render the scene with camera

// Create the scene.
const scene = new THREE.Scene()

// Create the camera.
const fov = 75
const aspect = window.innerWidth / window.innerHeight
const near = 0.1
const far = 5
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 2

// Create the renderer.
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create a cube and it to the scene.
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// This helper function calls itself every tick, using rAF.
const animate = x => {
  const t = x * 0.001

  cube.rotation.x = t
  cube.rotation.y = t

  // Render the scene.
  renderer.render(scene, camera)

  // Call rAF.
  // requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
