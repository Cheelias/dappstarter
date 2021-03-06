/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import NextApp, { AppInitialProps } from 'next/app'
import Head from 'next/head'
import styles from '@/styles/layout.module.css'
import '@/styles/globals.css'
import NavBar from '@/components/nav/NavBar'
import ThemeToggleLogo from '@/components/nav/ThemeToggleLogo'
import { LayoutContextProvider } from '@/hooks/LayoutContextContext'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

// import { connectors } from '../src/auth'

// import {
//   FortmaticConnector,
//   InjectedConnector,
//   PortisConnector,
//   TorusConnector,
//   WalletConnectConnector,
//   Provider as MultiauthProvider,
// } from '@ceramicstudio/multiauth'
// import type { PartialConnectorConfig } from '@ceramicstudio/multiauth'
// const connectors = [
//   {
//     key: 'injected',
//     connector: new InjectedConnector({ supportedChainIds: [1, 3, 1337] }),
//   },
// ]

const Layout = ({ children }) => {
  return (
    // <div className={styles.protectivePadding}>
    <>
      <NavBar />
      {children}
      <footer className={styles.footer}>
        <ThemeToggleLogo />
        <p
          style={{
            display: 'inline-block',
          }}
        >
          MOSEY
        </p>
      </footer>
      {/* </div> */}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getLibrary = (_provider, _connector) => {
    return ethers.getDefaultProvider()
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <LayoutContextProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3ReactProvider>
      </LayoutContextProvider>
    </>
  )
}

export default MyApp
