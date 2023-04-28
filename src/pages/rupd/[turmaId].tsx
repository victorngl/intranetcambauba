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

  const { turmaId } = router.query;

  const turma = useSWR(`/api/turma/${turmaId}`, fetcher)

  if (turma.isLoading) {
    return <h1>Carregando...</h1>
  }

  console.log(turma.data.disciplinas);

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
        <p>Turma: {turma.data.name}</p>
        <div>
          <ul>
            {turma.data.disciplinas.map((relacao, index) => (

              <li onClick={ (e) => router.push(`/rupd/disciplina/${relacao.id}`)} key={relacao.disciplina.id}>
                {relacao.disciplina.name}
              </li>

            ))}
          </ul>
        </div>
      </Container>
      <Footer />

    </>
  );
}