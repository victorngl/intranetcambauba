import '../styles/globals.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/header/Header';
import { SessionProvider } from "next-auth/react"
import SessionChecker from '../../components/auth/SessionChecker';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <SessionChecker>
        <Component {...pageProps} />
      </SessionChecker>
      <Header />
    </SessionProvider>
  );
}