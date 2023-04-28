import Head from 'next/head';
import Header from '../../components/header/Header';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  
  const router = useRouter();
  useEffect( ()=> {
    router.push('/comunicados/')
  }, [])

  return (
    <>
      <Header />
      <Head>
        <title>AEMC - Dashboard</title>
      </Head>

      
    </>
  );
}