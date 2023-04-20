import '../styles/globals.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/header/Header';
import AuthChecker from '../../components/auth/AuthChecker';
import UserProvider from '../../providers/user';
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <UserProvider>
        <AuthChecker>

          <Component {...pageProps} />
          <Header />

        </AuthChecker>
      </UserProvider>

    </SessionProvider>
  );
}