import Head from 'next/head';
import Header from '../../../components/header/Header';
import Navbar from '../../../components/navbar/Navbar';
import Container from '../../../components/utils/Container';
import Footer from '../../../components/footer/Footer';
import useSWR from 'swr';
import { fetcher } from '../../hooks/fetcher';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';



export default function Rupd() {
  const router = useRouter();

  const turmas = useSWR('/api/turma/', fetcher)

  if(turmas.isLoading) {
    return <h1>Carregando...</h1>
  }

  console.log(turmas.data);

  return (
    <>
      <Header />
      <Head>
        <title>AEMC - Relatório última prova detalhado</title>
      </Head>

      <Navbar />
      <Container>
        <div className="py-3 text-2xl mb-5 justify-between flex border-b-2">
          <p className=''>Relatório última prova detalhado</p>
        </div>
        {turmas.data.map((turma, index) => (
          <div onClick={ (e) => router.push(`/rupd/${turma.id}`)} key={turma.id}>
            <p>{turma.name}</p>
          </div>
        ))}
        <div>

        </div>
      </Container>
      <Footer />

    </>
  );
}