import 'solidity-coverage'
import 'hardhat-gas-reporter'
import 'tsconfig-paths/register'
import '@nomiclabs/hardhat-ethers'
import '@openzeppelin/hardhat-upgrades'
import { task } from 'hardhat/config'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

dotenvConfig({ path: resolve(__dirname, './.env.local') })

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args, { ethers }) => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config = {
  // defaultNetwork: 'goreli',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goreli: {
      url: 'https://goerli.infura.io/v3/342f5b93a972442d975c6c95f94ec49c',
      accounts: [process.env.INFURA_PRIVATE_KEY],
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/342f5b93a972442d975c6c95f94ec49c',
      accounts: [process.env.INFURA_PRIVATE_KEY],
    },
    // mumbai: {
    //   url: 'https://rpc-mumbai.matic.today',
    //   accounts: [process.env.POLYGON_PRIVATE_KEY],
    // },
  },
  solidity: {
    version: '0.8.8',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}

export default config
