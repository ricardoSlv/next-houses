import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { useAuth } from 'src/auth/useAuth'

interface IProps {
  main: ReactNode
}

const Layout: FC<IProps> = ({ main }) => {
  const { logout, authenticated } = useAuth()

  return (
    <div className='bg-gray-900 w-screen-xl h-screen mx-auto text-white grid grid-rows-layout'>
      <nav className='bg-gray-800 h-16'>
        <ul className='px-6 flex items-center justify-between h-16'>
          <li>
            <Link href='/'>
              <a>
                <img
                  src='/home-color.svg'
                  alt='home house'
                  className='inline w-6'
                />
              </a>
            </Link>
          </li>
          {authenticated ? (
            <>
              <li>
                <Link href='/houses/add'>
                  <a>Add house</a>
                </Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href='/auth'>
                <a> Login / Signup</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {main}
    </div>
  )
}

export default Layout
