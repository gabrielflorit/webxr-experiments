import * as THREE from './../node_modules/three/build/three.module.js'

import {
  resizeRendererToDisplaySize,
  addMeshAtX,
  addSolidGeometry
} from './utils.js'

const canvas = document.querySelector('canvas')

// To display anything, we need three things:
// - scene
// - camera
// - renderer, to render the scene with camera

// Create the scene.
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xaaaaaa)

// Create the camera.
const fov = 40
const aspect = 2
const near = 0.1
const far = 1000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 40

// Add a light.
{
  const color = 0xffffff
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)
}

// Create the renderer.
const renderer = new THREE.WebGLRenderer({ canvas })
document.body.appendChild(renderer.domElement)

const meshes = []

const geometries = [
  new THREE.BoxGeometry(1, 2, 3),
  new THREE.CircleGeometry(1, 12),
  new THREE.ConeGeometry(1, 2, 12),
  new THREE.CylinderGeometry(1, 2, 3, 12),
  new THREE.DodecahedronGeometry(1),
  new THREE.IcosahedronGeometry(1)
]

const spread = 5

geometries.forEach((geometry, i) => {
  addSolidGeometry({
    geometry,
    x: (i % 5) - 2,
    y: ((i / 5) | 0) - 2,
    scene,
    meshes,
    spread
  })
})

// This helper function calls itself every tick, using rAF.
const render = milliseconds => {
  const seconds = milliseconds * 0.001

  meshes.forEach((mesh, i) => {
    mesh.rotation.x = seconds
    mesh.rotation.y = seconds
  })

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }

  // Render the scene.
  renderer.render(scene, camera)

  // Call rAF.
  requestAnimationFrame(render)
}

requestAnimationFrame(render)
