import * as THREE from './../node_modules/three/build/three.module.js'

import {
  createRandomlyColoredMaterial,
  resizeRendererToDisplaySize,
  addGeometryToScene
} from './../js/utils.js'

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

// Create the camera.
const fov = 40
const aspect = 2
const near = 0.1
const far = 1000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, 50, 0)
camera.lookAt(0, 0, 0)

// Store our objects here.
const objects = []

// Create the sun parent node.
const solarSystem = new THREE.Object3D()
scene.add(solarSystem)
objects.push(solarSystem)

// Create the earth parent node.
const earthOrbit = new THREE.Object3D()
earthOrbit.position.x = 10
solarSystem.add(earthOrbit)
objects.push(earthOrbit)

// Create the moon parent node.
const moonOrbit = new THREE.Object3D()
moonOrbit.position.x = 2
earthOrbit.add(moonOrbit)
objects.push(moonOrbit)

// Create the sphere geometry.
const radius = 1
const widthSegments = 6
const heightSegments = 6
const sphereGeometry = new THREE.SphereBufferGeometry(
  radius,
  widthSegments,
  heightSegments
)

// Create the sun.
{
  const material = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
  const mesh = new THREE.Mesh(sphereGeometry, material)
  mesh.scale.set(3, 3, 3)
  solarSystem.add(mesh)
  objects.push(mesh)
}

// Create the earth.
{
  const material = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244
  })
  const mesh = new THREE.Mesh(sphereGeometry, material)
  earthOrbit.add(mesh)
  objects.push(mesh)
}

// Create the moon.
{
  const material = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222
  })
  const mesh = new THREE.Mesh(sphereGeometry, material)
  mesh.scale.set(0.5, 0.5, 0.5)
  moonOrbit.add(mesh)
  objects.push(mesh)
}

// Add a light.
{
  const color = 0xffffff
  const intensity = 1
  const light = new THREE.PointLight(color, intensity)
  scene.add(light)
}

objects.forEach((node, i) => {
  if (i < 6) {
    const axes = new THREE.AxesHelper()
    axes.material.depthTest = false
    axes.renderOrder = 1
    node.add(axes)
    console.log(i)
  }
})

// This helper function calls itself every tick, using rAF.
const render = milliseconds => {
  const seconds = milliseconds * 0.001

  objects.forEach(obj => {
    obj.rotation.y = seconds / 4
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
