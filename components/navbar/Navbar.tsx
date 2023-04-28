import Link from 'next/link';

const pages = ['Associação', 'Comunicados'];
const pagesLink = ['/associacao/', '/comunicados/'];
const settings = ['Dashboard', 'Perfil', 'Suporte',];
const settingsLink = ['/', '/perfil/', '/suporte/', ];

import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from 'react';

function Navbar() {
  const { data: session, status } = useSession();

  const [profileOpen, SetProfileOpen] = useState<Boolean>(false);
  const [mobileOpen, SetMobileOpen] = useState<Boolean>(false);
  const [width, setWidth] = useState<number>(769);
  
  useEffect( () => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [])
  
  const avatarUrl = `https://avatar-letter.site/api/file/set1/big/${session.user.name[0]}/png`;
  
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <img src='/logo.png' className="h-12 mr-3" alt="Flowbite Logo" />
            {/*<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Eficaz</span>*/}
          </Link>
          <div className="flex items-center md:order-2">
            <button onClick={ (e) => SetProfileOpen(!profileOpen) } type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src={avatarUrl} alt="user photo" />
            </button>

            { profileOpen &&
              <div
                className="z-50 fixed top-12 right-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{session.user.name}</span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{session.user.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  {settings.map((setting, index) => (
                    <li key={index}>
                      <Link href={settingsLink[index]}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{setting}</Link>
                    </li>
                  ))}
                  <li>
                      <button onClick={(e) => signOut({ callbackUrl: '/' })}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sair</button>
                  </li>
                </ul>
              </div>
            }
            
            <button onClick={(e) => SetMobileOpen(!mobileOpen)} type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          { ((width > 768) || (mobileOpen && width <= 768)) &&
            <div className="transition-opacity w-full items-center justify-between md:flex md:w-auto md:order-1" id="mobile-menu-2">
              <ul
                className="flex flex-col font-medium p-2 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {pages.map((page, index) => (
                  <li key={index}>
                    <Link href={pagesLink[index]}
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                      {page}</Link>
                  </li>
                ))}
              </ul>
            </div>
          }
          
        </div>

      </nav>
    </>
  );
}
export default Navbar;