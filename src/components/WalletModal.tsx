import { useLayoutContext } from '@/hooks/LayoutContextContext'
import styles from '@/styles/walletmodal.module.css'
import { useWeb3React } from '@web3-react/core'
import {
  injected,
  network,
  walletconnect,
  walletlink,
  ledger,
  trezor,
  lattice,
  // frame,
  // authereum,
  fortmatic,
  magic,
  portis,
  torus,
} from 'connectors'
import { useEffect, useState, useRef } from 'react'
import { useEagerConnect, useInactiveListener } from '@/hooks/connection'
import useOutsideClick from '@/hooks/useOutsideClick'
import { setCookie } from 'nookies'

const WalletModal = (): any => {
  const [activatingConnector, setActivatingConnector] = useState()
  const { connector, account, activate, error } = useWeb3React()
  const { walletConnectModalOpen, openOrCloseConnectWalletModal } =
    useLayoutContext()
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)
  const ref = useRef()

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])
  useOutsideClick(ref, () => {
    if (walletConnectModalOpen) openOrCloseConnectWalletModal()
  })

  // eslint-disable-next-line no-unused-vars
  enum ConnectorNames {
    // eslint-disable-next-line no-unused-vars
    Injected = 'Injected',
    // eslint-disable-next-line no-unused-vars
    Network = 'Network',
    // eslint-disable-next-line no-unused-vars
    WalletConnect = 'WalletConnect',
    // eslint-disable-next-line no-unused-vars
    WalletLink = 'WalletLink',
    // eslint-disable-next-line no-unused-vars
    Ledger = 'Ledger',
    // eslint-disable-next-line no-unused-vars
    Trezor = 'Trezor',
    // eslint-disable-next-line no-unused-vars
    Lattice = 'Lattice',
    // eslint-disable-next-line no-unused-vars
    // Frame = 'Frame',
    // // eslint-disable-next-line no-unused-vars
    // Authereum = 'Authereum',
    // eslint-disable-next-line no-unused-vars
    Fortmatic = 'Fortmatic',
    // eslint-disable-next-line no-unused-vars
    Magic = 'Magic',
    // eslint-disable-next-line no-unused-vars
    Portis = 'Portis',
    // eslint-disable-next-line no-unused-vars
    Torus = 'Torus',
  }

  // eslint-disable-next-line no-unused-vars
  const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.Network]: network,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.WalletLink]: walletlink,
    [ConnectorNames.Ledger]: ledger,
    [ConnectorNames.Trezor]: trezor,
    [ConnectorNames.Lattice]: lattice,
    // [ConnectorNames.Frame]: frame,
    // [ConnectorNames.Authereum]: authereum,
    [ConnectorNames.Fortmatic]: fortmatic,
    [ConnectorNames.Magic]: magic,
    [ConnectorNames.Portis]: portis,
    [ConnectorNames.Torus]: torus,
  }

  const Spinner = ({ color, ...rest }: any) => {
    return (
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke={color}
        {...rest}
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    )
  }
  console.log({ walletConnectModalOpen })

  const onConnectedWallet = ({ currentConnector, name }) => {
    try {
      setActivatingConnector(currentConnector)
      activate(connectorsByName[name])
      openOrCloseConnectWalletModal()
      console.log({ account })
      // Set
      setCookie(null, 'persist:account', 'value', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
    } catch (error) {
      console.error({ error })
    }
  }
  console.log({ account })

  return (
    <div
      className={
        walletConnectModalOpen
          ? styles.modalContainerBlock
          : styles.modalContainerHidden
      }
    >
      <div className={styles.modalContent} ref={ref}>
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name]
          const activating = currentConnector === activatingConnector
          const connected = currentConnector === connector
          const disabled =
            !triedEager || !!activatingConnector || connected || !!error

          return (
            <button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                borderColor: activating
                  ? 'orange'
                  : connected
                  ? 'green'
                  : 'unset',
                cursor: disabled ? 'unset' : 'pointer',
                position: 'relative',
              }}
              disabled={disabled}
              key={name}
              onClick={() => onConnectedWallet({ currentConnector, name })}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  margin: '0 0 0 1rem',
                }}
              >
                {activating && (
                  <Spinner
                    color={'black'}
                    style={{ height: '25%', marginLeft: '-1rem' }}
                  />
                )}
                {connected && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </div>
              {name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default WalletModal
