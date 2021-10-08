import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import lerp from 'lerp'
import Plane from '@/components/fiber/Plane'

import Content from '@/components/fiber/Content'
import Background from '@/components/fiber/Background'
import fiberconstants from '@/components/fiber/constants'
import Lights from '@/components/fiber/Lights'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ThreeCanvas = () => {
  const {
    zoom,
    top,
    pages,
    //  paragraphs,
    sections,
  }: any = fiberconstants
  const scrollArea = useRef<any>(null)
  const onScroll = e => (top.current = e.target.scrollTop)
  // eslint-disable-next-line no-void
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  const Loading = () => {
    // eslint-disable-next-line no-undef
    const ref = useRef(null)
    useFrame(
      () =>
        (ref.current.material.opacity = lerp(
          ref.current.material.opacity,
          0,
          0.025,
        )),
    )
    return (
      <Plane
        ref={ref}
        color="#0e0e0f"
        position={[0, 0, 200]}
        scale={[100, 100, 1]}
        top={top}
        pages={pages}
      />
    )
  }
  return (
    <>
      <Canvas
        linear
        dpr={[1, 2]}
        orthographic
        camera={{ zoom, position: [0, 0, 120], fov: 70 }}
      >
        <Suspense
          fallback={
            <Html center className="loading">
              <p>loading...</p>
            </Html>
          }
        >
          <Loading />
          <Lights />
          <Content />
          <Background />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(sections).fill(sections).map((element, index) => {
          console.log({ index, pages, sections })
          console.log()
          return (
            <div
              key={index}
              id={'0' + index}
              style={{ height: `${(pages / sections) * 100}vh` }}
            />
          )
        })}
      </div>
    </>
  )
}

export default ThreeCanvas
