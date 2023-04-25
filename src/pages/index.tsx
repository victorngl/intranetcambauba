import Head from 'next/head';
import Header from '../../components/header/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push('/orcamento')
  }, [])

  return (
    <>
      <Header />
      <Head>
        <title>Eficaz - Dashboard</title>
      </Head>
    </>
  );
}