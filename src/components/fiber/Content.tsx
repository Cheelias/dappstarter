import { useBlock, Block } from './blocks'
import { Text } from './Text'
import Plane from './Plane'
import constants from './constants'
import { Html } from '@react-three/drei'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import Link from 'next/link'

const Paragraph = ({ index, offset, factor, header, aspect, text }) => {
  const { zoom } = constants

  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock()
  const size = aspect < 1 && !mobile ? 0.65 : 1
  const alignRight = (canvasWidth - w * size - margin) / 2
  const pixelWidth = w * zoom * size
  const left = !(index % 2)
  const color = index % 2 ? '#D40749' : '#2FE8C3'
  console.log({ left, w, size, aspect })
  console.log([((left ? -w : w) * size) / 2, (w * size) / aspect / 2 + 0.5, -1])
  return (
    <Block factor={factor} offset={offset}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Plane
          // map={image}
          args={[1, 1, 32, 32]}
          shift={75}
          size={size}
          aspect={aspect}
          scale={[w * size, (w * size) / aspect, 1]}
          frustumCulled={false}
        />
        <Html
          style={{
            width: pixelWidth / (mobile ? 1 : 2),
            textAlign: left ? 'left' : 'right',
          }}
          position={[
            left || mobile ? (-w * size) / 2 : 0,
            (-w * size) / 2 / aspect - 0.4,
            1,
          ]}
        >
          <div tabIndex={index}>{text}</div>
        </Html>
        <Text
          size={w * 0.04}
          color={color}
          position={[
            ((left ? -w : w) * size) / 2,
            (w * size) / aspect / 2 + 0.5,
            -1,
          ]}
        >
          {header}
        </Text>
        <Block factor={0.2}>
          <Text
            opacity={0.5}
            size={w * 0.5}
            color="#1A1E2A"
            position={[
              ((left ? w : -w) / 2) * size,
              (w * size) / aspect / 1,
              -10,
            ]}
          >
            {'0' + (index + 1)}
          </Text>
        </Block>
      </group>
    </Block>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Content = (): any => {
  const { paragraphs } = constants
  // const images = useLoader(
  //   TextureLoader,
  //   paragraphs.map(({ image }) => image),
  // )
  // useMemo(
  //   () => images.forEach(texture => (texture.minFilter = LinearFilter)),
  //   [images],
  // )
  const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile } = useBlock()
  console.log({ w })
  return (
    <>
      <Block factor={1} offset={0}>
        <Block factor={1.2}>
          {/* <Text
            // left
            size={w * 0.15}
            position={[-w / 3.2, 0.5, -1]}
            color="#d40749"
          >
            MOKSHA
          </Text> */}
          <Html
            // fullscreen
            // className="bottom-left"
            // style={{ color: 'white' }}
            position={[-canvasWidth * 0.05, 3, 0]}
          >
            <div
            //  className={styles.textContainer}
            >
              <h1>
                <a href="dashboard">MOSEY</a>
              </h1>
            </div>
          </Html>
        </Block>
        <Block factor={1.0}>
          <Html
            // fullscreen
            // className="bottom-left"
            // style={{ color: 'white' }}
            position={[-canvasWidth / 2, -canvasHeight / 2, 0]}
          >
            <div
            //  className={styles.textContainer}
            >
              <h1>
                It was the year 2076.{mobile ? <br /> : ' '}The substance had
                arrived.
              </h1>
            </div>
          </Html>
        </Block>
      </Block>
      {/* <Block factor={1.2} offset={5.7}>
        <MultilineText
          top
          left
          size={w * 0.15}
          lineHeight={w / 5}
          position={[-w / 3.5, 0, -1]}
          color="#2fe8c3"
          text={'four\nzero\nzero'}
        />
      </Block> */}
      {paragraphs.map((props, index) => (
        <Paragraph
          key={index}
          index={index}
          {...props}
          // image={images[index]}
        />
      ))}
      {/* {stripes.map(({ offset, color, height }, index) => (
        <Block key={index} factor={-1.5} offset={offset}>
          <Plane
            args={[50, height, 32, 32]}
            shift={-4}
            color={color}
            rotation={[0, 0, Math.PI / 8]}
            position={[0, 0, -10]}
          />
        </Block>
      ))} */}
      {/* <Block factor={1.25} offset={8}>
        <Html
          style={{ color: 'white' }}
          className="bottom-left"
          position={[-canvasWidth / 2, -canvasHeight / 2, 0]}
        >
          Culture is not your friend.
        </Html>
      </Block> */}
    </>
  )
}

export default Content
