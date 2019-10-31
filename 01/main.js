import * as THREE from './../node_modules/three/build/three.module.js'

import {
  resizeRendererToDisplaySize,
  // addMeshAtX,
  addGeometryToScene
} from './utils.js'

const canvas = document.querySelector('canvas')

// To display anything, we need three things:
// - scene
// - camera
// - renderer, to render the scene with camera

// Create the renderer.
const renderer = new THREE.WebGLRenderer({ canvas })
document.body.appendChild(renderer.domElement)

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

// Create an array of meshes. We need this to stick around
// so that we can rotate each mesh later.
const meshes = []

// Create geometries.
const geometries = [
  new THREE.BoxGeometry(1, 2, 3),
  new THREE.CircleGeometry(1, 12),
  new THREE.ConeGeometry(1, 2, 12),
  new THREE.CylinderGeometry(1, 2, 3, 12),
  new THREE.DodecahedronGeometry(1),
  new THREE.IcosahedronGeometry(1),
  new THREE.OctahedronGeometry(1),
  new THREE.PlaneGeometry(1, 2, 12, 12),
  new THREE.RingGeometry(1, 2, 12),
  new THREE.SphereGeometry(1, 12, 12),
  new THREE.TetrahedronGeometry(1),
  new THREE.TorusGeometry(2, 1, 12, 12),
  new THREE.TorusKnotGeometry(2, 1 / 4, 12 * 8, 24, 3, 4),
  new THREE.BoxGeometry(1, 2, 3),
  new THREE.CircleGeometry(1, 12),
  new THREE.ConeGeometry(1, 2, 12),
  new THREE.CylinderGeometry(1, 2, 3, 12),
  new THREE.DodecahedronGeometry(1),
  new THREE.IcosahedronGeometry(1),
  new THREE.OctahedronGeometry(1),
  new THREE.PlaneGeometry(1, 2, 12, 12),
  new THREE.RingGeometry(1, 2, 12),
  new THREE.SphereGeometry(1, 12, 12),
  new THREE.TetrahedronGeometry(1),
  new THREE.TorusGeometry(2, 1, 12, 12)
]

const padding = 5

// Turn the geometries into meshes and add them to our scene.
geometries.forEach((geometry, i) => {
  addGeometryToScene({
    geometry,
    x: (i % 5) - 2,
    y: ((i / 5) | 0) - 2,
    scene,
    meshes,
    padding
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
