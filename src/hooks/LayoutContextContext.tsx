import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export const LayoutContext = createContext({})
declare global {
  interface Window {
    ethereum: any
  }
}

export const LayoutContextProvider: FC = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false)
  const [walletConnectModalOpen, setWalletConnectModalOpen] = useState(false)

  useEffect(() => {
    // getConnectedAccounts()
  }, [])

  const openOrCloseConnectWalletModal = () => {
    console.log('hue')
    setWalletConnectModalOpen(!walletConnectModalOpen)
  }

  const values = useMemo(
    () => ({
      darkTheme,
      setDarkTheme,
      walletConnectModalOpen,
      openOrCloseConnectWalletModal,
    }),
    [darkTheme, walletConnectModalOpen],
  )
  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  )
}

export const useLayoutContext: any = () => {
  const context = useContext(LayoutContext)
  // console.log('useUser context', context)

  if (context === undefined) {
    throw new Error(
      '`useLayoutContext` hook must be used within a `LayoutContextProvider` component',
    )
  }
  return context
}
