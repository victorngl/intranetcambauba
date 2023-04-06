import React, { useEffect, useState, useMemo, useRef } from 'react';
import Head from 'next/head'
import Navbar from '../../../components/utils/Navbar';
import Estimate from '../../../components/estimate/Estimate';
import Box from '@mui/material/Box';
import SearchField from '../../../components/estimate/SearchField';
import EstimateSelectedTable from '../../../components/estimate/EstimateSelectedTable';
import { Divider, Button, Container } from '@mui/material';
import '@fontsource/roboto/400.css';
import ExportEstimateExcel from '../../../components/estimate/ExportEstimateExcel';

type Product = {
  name: string;
  price: number;
  unity?: string;
  quantity?: number;
  price_amount?: number;
}

export default function EstimatePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(2);
  const [buttonAddEnabled, setButtonAddEnabled] = useState<boolean>(false);

  const [newEstimate, setNewEstimate] = useState({
    name: "",
    cnpj: "",
    statusId: 1,
    products: [],
    totalprice: 0,
  });


  const [busca, setBusca] = useState<String>('');

  useEffect(() => {
    fetch('/api/products/products')
      .then((response) => { return response.json(); })
      .then(data => { setProducts(data); })
  }, [])

  useEffect(() => {
    setNewEstimate({ ...newEstimate, products: selectedProducts })
    setButtonAddEnabled(false);
  }, [selectedProducts])

  const saveEstimate = async (e: any) => {
    setNewEstimate({
      ...newEstimate,
      name: "AEMC",
      cnpj: "00001",
      products: selectedProducts,
    });


    fetch("/api/estimate/create", {
      method: "POST",
      body: JSON.stringify(newEstimate),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => { return response.json(); })
      .then(data => { console.log('Orçamento criado') });

  };


  //Busca no Array
  const filteredProducts = useMemo(() => {
    const lowerBusca = busca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return products
      .filter((product) => product.name
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .includes(lowerBusca))
  }, [busca, products])

  //Add a item to orçamento
  function handleSelectProduct(product: Product) {
    setButtonAddEnabled(true);

    setSelectedProducts((prevList) => {
      var totalProductPrice = (product.price * selectedQuantity);
      setNewEstimate({ ...newEstimate, totalprice: newEstimate.totalprice + totalProductPrice })
      product.quantity = selectedQuantity;
      product.price_amount = totalProductPrice;
      return [product, ...prevList]
    });
  }

  return (
    <>
      <Head>
        <title>EFICAZ - Orçamento</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Estimate>
        <Box className='font-bold text-lg'>Buscar Produtos
          <SearchField className='' onChange={(e) => setBusca(e.target.value)} />

          <Divider className='my-2' />


          <table>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td className="w-20" >{product.name}</td>
                  <td className="w-20" >R$ {product.price}</td>
                  <td> <Button disabled={buttonAddEnabled} className="text-black rounded bg-white" onClick={e => handleSelectProduct(product)}>Adicionar</Button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <Divider className='my-2' />
          {/*div que será o PDF*/}

          <p className='text-lg font-bold my-2'>Produtos Selecionados</p>
          <Box className="font-bold text-lg text-right my-2">
            <p>Valor Total: R$ {newEstimate.totalprice}</p>
          </Box>

          <Divider className='my-5' />

          <Box className='flex'>
            <Box className='w-6/12 text-left flex gap-8'>
              <Button onClick={(e) => saveEstimate(e)} className='bg-green-500 hover:bg-green-200 text-white ml-2'>Salvar</Button>
              <ExportEstimateExcel selectedProducts={selectedProducts} />
            </Box>



          </Box>

        </Box>
      </Estimate>



    </>
  )
}
