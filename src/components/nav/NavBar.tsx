// import AccountButton from './AccountButton'
import ThemeToggleLogo from './ThemeToggleLogo'
import Link from 'next/link'
import { useLayoutContext } from '@/hooks/LayoutContextContext'
import { useWeb3React } from '@web3-react/core'

// const MoreButton = () => {
//   return (
//     <svg
//       width="30"
//       height="30"
//       viewBox="0 0 30 30"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       // class="sc-hMqMXs uhlXa"
//     >
//       <path
//         d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       ></path>
//       <path
//         d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       ></path>
//       <path
//         d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       ></path>
//     </svg>
//   )
// }

const NavBar: any = () => {
  // const [open, setOpen] = useState(false)
  const { active, account, deactivate } = useWeb3React()
  const { openOrCloseConnectWalletModal } = useLayoutContext()
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ThemeToggleLogo />
        <p
          style={{
            display: 'inline-block',
          }}
        >
          <Link href="/">
            <a href="/">MOSEY</a>
          </Link>
        </p>
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        {active ? (
          <>
            <p>{account}</p>
            <button onClick={deactivate}>disconnect</button>
          </>
        ) : (
          <button onClick={openOrCloseConnectWalletModal}>
            Connect Wallet
          </button>
        )}
        {/* <AccountButton /> */}
      </div>
    </nav>
  )
}

export default NavBar
