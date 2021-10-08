/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Vector3, TextBufferGeometry } from 'three'
import { useCallback, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAsset } from 'use-asset'
import lerp from 'lerp'
import constants from './constants'

const Text = ({
  children,
  size = 1,
  left = 0,
  right = 0,
  bottom = 0,
  color = 'white',
  opacity = 1,
  height = 0.01,
  // layers = 0,
  // font = '/MOONGET_Heavy.blob',

  ...props
}): any => {
  const { top }: any = constants
  // // const data = useLoader(FontLoader, font)
  const geom = useAsset(
    () =>
      new Promise(resolve =>
        resolve(
          new TextBufferGeometry(children, {
            // font: data,
            size: 1,
            height,
            curveSegments: 32,
          }),
        ),
      ),
  )
  const onUpdate = useCallback(
    self => {
      const box = new Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(box)
      self.position.x = left ? 0 : right ? -box.x : -box.x / 2
      self.position.y = top ? 0 : bottom ? -box.y : -box.y / 2
    },
    [left, right, top, bottom],
  )
  const ref = useRef(null)
  let last = top.current
  useFrame(() => {
    ref.current.shift = lerp(ref.current.shift, (top.current - last) / 100, 0.1)
    last = top.current
  })
  // console.log({ size })

  return (
    <group {...props} scale={[size, size, 0.1]}>
      <mesh geometry={geom} onUpdate={onUpdate} frustumCulled={false}>
        <customMaterial ref={ref} color={color} transparent opacity={opacity} />
      </mesh>
    </group>
  )
}

const MultilineText = ({
  text,
  size = 1,
  // lineHeight = 1,
  // position = [0, 0, 0],
  ...props
}) =>
  text.split('\n').map((text, index) => (
    <Text
      key={index}
      size={size}
      {...props}
      // position={[position[0], position[1] - index * lineHeight, position[2]]}
    >
      {text}
    </Text>
  ))

export { Text, MultilineText }
