/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useLoader } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Model = ({ url }) => {
  useLoader(GLTFLoader, url)

  const [model, setModel] = useState()
  const [, setAnimation] = useState()

  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load(url, async gltf => {
      const nodes = await gltf.parser.getDependencies('node')
      const animations = await gltf.parser.getDependencies('animation')
      setModel(nodes[0])
      setAnimation(animations)
    })
  })

  return (
    <>
      {model ? (
        false
      ) : (
        // <primitive object={gltf.scene} dispose={null} />
        <Html>loading</Html>
      )}
    </>
  )
}

export default Model
