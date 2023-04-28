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



export default function ComunicadoCreate() {
  const router = useRouter();

  const comunicados = useSWR('/api/comunicado/', fetcher)
  const turmas = useSWR('/api/turma/', fetcher)

  if (comunicados.isLoading) return <div>Carregando...</div>
  if (turmas.isLoading) return <div>Carregando...</div>

  return (
    <>
      <Header />
      <Head>
        <title>AEMC - Dashboard</title>
      </Head>

      <Navbar />
      <Container>
        <div className="text-2xl mb-5 justify-between flex">
          <a>Comunicados</a>
          <button onClick={(e) => router.push('/comunicados/create')} type='button' className='text-white font-semibold p-4 text-sm rounded bg-blue-600 hover:bg-blue-500'>Criar comunicado</button>
        </div>

        <div>
          <p>Comunicados</p>
          {comunicados.data.length ?
            (comunicados.data.map((comunicado, index) => (
              <div key={comunicado.id}>
                <Link  href={comunicado.file} className='font-bold'>{comunicado.title}</Link>
              </div>
            ))) : <div>Nenhum comunicado encontrado</div>}
        </div>


        <div className='mt-10'>
          <p>Turmas</p>
          {turmas.data.length ?
            (turmas.data.map((turma, index) => (
              <div key={turma.id}>
                <a  className='font-bold'>{turma.name}</a>
              </div>
            ))) : <div>Nenhuma turma encontrado</div>}
        </div>
      </Container>
      <Footer />

    </>
  );
}