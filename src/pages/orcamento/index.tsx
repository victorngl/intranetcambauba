import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head'
import router from 'next/router';

import Navbar from '../../../components/utils/Navbar';
import Container from '../../../components/utils/Container';
import SearchField from '../../../components/utils/SearchField';
import Divider from '../../../components/utils/Divider';

import EstimateShowTable from '../../../components/estimate/EstimateShowTable';
import Footer from '../../../components/footer/Footer';

export default function EstimatePage() {
  const [estimates, setEstimates] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetch('/api/estimate/estimates')
      .then((response) => { return response.json(); })
      .then(data => { setEstimates(data); })

  }, [])

  const filteresEstimates = useMemo(() => {
    const lowerBusca = busca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return estimates
      .filter((estimate) => estimate.name
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .includes(lowerBusca))
  }, [busca, estimates])

  return (
    <>
      <Head>
        <title>Eficaz - Orçamentos</title>
      </Head>

      <Navbar />
      <Container>

        <p className='font-bold text-lg my-2'>Orçamentos</p>

        <Divider className='my-2' />


        <div className='space-y-2'>
          <p>Buscar</p>
          <div className='flex justify-between'>
            <SearchField onChange={(e) => setBusca(e.target.value)}></SearchField>
            <button type='button' className='text-sm p-2 font-semibold rounded-lg bg-green-500 text-white' onClick={() => router.push(`/orcamento/create`)}>Criar orçamento</button>
          </div>

        </div>

        <Divider className='my-2' />

        <EstimateShowTable data={filteresEstimates} />

      </Container>
      <Footer />
    </>
  )
}
