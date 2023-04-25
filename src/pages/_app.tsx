import '../styles/globals.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/header2/Header';
import { SessionProvider, useSession } from "next-auth/react"
import SessionChecker from '../../components/auth/SessionChecker';
import LoginForm from '../../components/auth/LoginForm';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <SessionChecker>
        <Component {...pageProps} />
        <Header />
      </SessionChecker>
      <Header />

    </SessionProvider>
  );
}

/*
<SessionChecker>
        <Component {...pageProps} />
        <Header />
      </SessionChecker>
      */