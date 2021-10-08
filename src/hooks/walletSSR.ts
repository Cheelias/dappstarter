/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { etherJsFetcher } from 'ether-swr'
import { JsonRpcSigner, Provider } from '@ethersproject/providers'
import { utils, Wallet } from 'ethers'
import { IncomingMessage } from 'http'
import { parseCookies } from 'nookies'
export const createEtherFetcherSSR = ({
  provider,
  signer,
}: {
  provider: Provider
  signer: Wallet | JsonRpcSigner
}) => {
  return etherJsFetcher(provider, signer)
}

export const getWalletInitialData = async ({
  req,
  provider,
}: {
  req?: IncomingMessage
  provider: Provider
}) => {
  const cookies = parseCookies({ req })
  console.log({ cookies })

  const address = cookies['nfttaxguide-eth-address']

  if (address) {
    return {
      balance: utils.formatEther(await provider.getBalance(address)),
      address,
    }
  } else {
    return { balance: null, address: null }
  }
}
