import { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import lerp from 'lerp'
import { useBlock } from './blocks'
import './CustomMaterial'
import constants from './constants'
// import { useFiberContext } from '@/hooks/fiberContext'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      customMaterial: any
    }
  }
}
const Plane = forwardRef(
  (
    { color = 'white', shift = 1, opacity = 1, args, map, ...props }: any,
    ref,
  ) => {
    const { viewportHeight, offsetFactor } = useBlock()
    const { top, pages }: any = constants

    const material = useRef<any>(null)

    let last = top.current

    useFrame(() => {
      material.current.scale = lerp(
        material.current.scale,
        offsetFactor - top.current / ((pages - 1) * viewportHeight),
        0.1,
      )
      material.current.shift = lerp(
        material.current.shift,
        ((top.current - last) / shift) * 1.5,
        0.1,
      )
      last = top.current
    })

    return (
      <mesh ref={ref} {...props}>
        <planeBufferGeometry args={args} />
        <customMaterial
          ref={material}
          color={color}
          map={map}
          transparent
          opacity={opacity}
        />
      </mesh>
    )
  },
)

export default Plane
