import { createContext, useRef, useContext } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import lerp from 'lerp'
import constants from './constants'

const offsetContext = createContext(0)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Block = ({ children, offset = undefined, factor, ...props }) => {
  const { offset: parentOffset, sectionHeight } = useBlock()
  const ref = useRef<any>()
  offset = offset !== undefined ? offset : parentOffset
  useFrame(() => {
    const curY = ref.current.position.y
    const curTop: any = constants.top.current
    ref.current.position.y = lerp(curY, (curTop / constants.zoom) * factor, 0.1)
  })
  console.log({ sectionHeight })
  console.log([0, -sectionHeight * offset * factor, 0])
  return (
    <offsetContext.Provider value={offset}>
      <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
        {/* <group {...props} position={[0, offset * factor, 0]}> */}
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  )
}

const useBlock = (): any => {
  const { sections, pages, zoom } = constants
  const { size, viewport } = useThree()
  console.log({ zoom })
  const offset = useContext(offsetContext)
  const viewportWidth = viewport.width * zoom
  const viewportHeight = viewport.height * zoom
  const canvasWidth = viewportWidth / zoom
  const canvasHeight = viewportHeight / zoom
  const mobile = size.width < 700
  const margin = canvasWidth * (mobile ? 0.2 : 0.1)
  const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6)

  const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1))
  const offsetFactor = (offset + 1.0) / sections
  console.log({
    viewport,
    offset,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    mobile,
    margin,
    contentMaxWidth,
    sectionHeight,
    offsetFactor,
  })
  return {
    viewport,
    offset,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    mobile,
    margin,
    contentMaxWidth,
    sectionHeight,
    offsetFactor,
  }
}

export { Block, useBlock }
