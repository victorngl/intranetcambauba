import Head from 'next/head';
import Header from '../../../../components/header/Header';
import Navbar from '../../../../components/navbar/Navbar';
import Container from '../../../../components/utils/Container';
import Footer from '../../../../components/footer/Footer';
import useSWR from 'swr';
import { fetcher } from '../../../hooks/fetcher';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';



export default function Rupd() {
  const router = useRouter();

  const { disciplinaId } = router.query;

  const relacaoDisciplina = useSWR(`/api/disciplina/${disciplinaId}`, fetcher)

  if (relacaoDisciplina.isLoading) {
    return <h1>Carregando...</h1>
  }

  const { disciplina, rupd } = relacaoDisciplina.data

  console.log(rupd);
  

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
        <p>Disciplina: {disciplina.name}</p>
        <div>
          {rupd.map( (notas, index) => (
            
            <div key={notas.id} className='flex'>
             
              <div className='whitespace-nowrap w-48'>Nome: {notas.aluno.name}</div>
              <div className='w-20'>1º Tri: {notas.firstNote}</div>
              <div className='w-20'>2º Tri: {notas.secondNote}</div>
              <div className='w-20'></div>
              <div className='w-20'>3º Tri: {notas.thirdNote}</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>


          ))}
        </div>
      </Container>
      <Footer />

    </>
  );
}