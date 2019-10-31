import * as THREE from './../node_modules/three/build/three.module.js'

// Helper function that resizes the renderer buffer
// given the canvas it's in and the device pixel ratio.
const resizeRendererToDisplaySize = renderer => {
  const canvas = renderer.domElement
  const pixelRatio = window.devicePixelRatio

  // NOTE to self: I still don't really remember the difference
  // between canvas.clientWidth and canvas.width.
  const width = (canvas.clientWidth * pixelRatio) | 0
  const height = (canvas.clientHeight * pixelRatio) | 0

  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}

const positionMesh = ({ mesh, x, y, padding }) => {
  mesh.position.x = x * padding
  mesh.position.y = y * padding
}

const addMeshToScene = ({ mesh, scene, meshes }) => {
  scene.add(mesh)
  meshes.push(mesh)
}

const createRandomlyColoredMaterial = () => {
  const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide
  })

  const hue = seedRandom()
  const saturation = 1
  const luminance = 0.5
  material.color.setHSL(hue, saturation, luminance)

  return material
}

const addGeometryToScene = ({ geometry, scene, x, y, meshes, padding }) => {
  const material = createRandomlyColoredMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  positionMesh({ mesh, x, y, padding })
  addMeshToScene({ mesh, scene, meshes })
}

export {
  resizeRendererToDisplaySize,
  addGeometryToScene,
  createRandomlyColoredMaterial
  // addMeshAtX,
  //   addMeshToScene,
}

// Helper function that takes a geometry and a color,
// creates a mesh with both, and places it at x.
// const addMeshAtX = ({ geometry, color, x, scene }) => {
//   const material = new THREE.MeshPhongMaterial({ color })
//   const mesh = new THREE.Mesh(geometry, material)
//   scene.add(mesh)
//   mesh.position.x = x
//   return mesh
// }
