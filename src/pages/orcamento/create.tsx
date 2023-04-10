import React, { useEffect, useState, useMemo, useRef } from 'react';
import Head from 'next/head'
import Navbar from '../../../components/utils/Navbar';
import Estimate from '../../../components/estimate/Estimate';
import Box from '@mui/material/Box';
import SearchField from '../../../components/estimate/SearchField';
import EstimateSelectedTable from '../../../components/estimate/EstimateSelectedTable';
import { Divider, Button, Container, Typography } from '@mui/material';
import '@fontsource/roboto/400.css';
import ExportEstimateExcel from '../../../components/estimate/ExportEstimateExcel';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import CompanyInfo from '../../../components/estimate/CompanyInfo';
import EditSelectedProduct from '../../../components/estimate/EditSelectedProduct';

type Product = {
  name: string;
  price: number;
  unity?: string;
  quantity?: number;
  price_amount?: number;
}

export default function EstimatePage() {
  const router = useRouter();

  const notifyCreateSuccefull = () => toast.success("Orçamento criado com sucesso!");

 
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  const [estimate, setEstimate] = useState({
    id: 0,
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


  //Add a item to orçamento
  function handleAddProduct(product: Product) {

    let totalProductPrice = (product.price * product.quantity);
    product.price_amount = totalProductPrice;

    let newList = estimate.products;
    newList.push(product);

    setEstimate({
      ...estimate,
      products: newList,
      totalprice: estimate.totalprice + totalProductPrice
    });

  }



  function handleRemoveProduct(index, product) {
    //Desabilita o botao para evitar bugs;
    let totalProductPrice = (product.price * product.quantity);

    let totalAmount = estimate.totalprice - totalProductPrice
    if (totalAmount < 0.2) { totalAmount = 0; }

    let List = estimate.products;
    let newList = List.filter((_, i) => i !== index)

    setEstimate({
      ...estimate,
      products: newList,
      totalprice: totalAmount,
    });

  }

  const saveEstimate = async (e: any) => {
    fetch("/api/estimate/create", {
      method: "POST",
      body: JSON.stringify(estimate),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          notifyCreateSuccefull()
          router.push('/orcamento')
        }
        return response.json();
      })
      .then(data => {

        console.log('Orçamento criado'); console.log(data)

      });

  };

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
  }

  //Busca no Array
  const filteredProducts = useMemo(() => {
    const lowerBusca = busca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filtered = products
      .filter((product) => product.name
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .includes(lowerBusca))

    const limited = filtered.filter((val, i) => i < 5)

    return limited
  }, [busca, products])



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
        <CompanyInfo estimate={estimate} setEstimate={setEstimate} />

        <Box className='font-bold text-lg'>
          <Typography variant="h6">
            Buscar Produtos
          </Typography>
          <SearchField className='w-full' onChange={(e) => setBusca(e.target.value)} />

          <Divider className='my-2' />

          <div className='w-full md:flex'>
            <div className='md:w-8/12 h-min '>
              <table className='w-8/12'>
                <tbody className=''>
                  {filteredProducts.map((product, index) => (
                    <tr className='' key={index}>
                      <td className="w-max" >{product.name}</td>
                      <td className="w-max" >R$ {product.price}</td>
                      <td className='w-max text-right pr-10'> <Button className="text-black rounded bg-blue-400" onClick={e => handleSelectProduct(product)}>Selecionar</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <EditSelectedProduct selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} handleAddProduct={handleAddProduct} />
          </div>

          <Divider className='my-2' />

          <div className="flex items-center justify-between font-bold w-full mb-5">
            <p className='text-left'>Produtos Selecionados</p>
            <p className='text-right'>Valor Total: R$ {estimate.totalprice}</p>
          </div>

          <EstimateSelectedTable estimate={estimate} handleRemoveProduct={handleRemoveProduct} />

          <Divider className='my-5' />

          <Box className='flex'>
            <Box className='w-6/12 text-left flex gap-8'>
              <Button onClick={(e) => saveEstimate(e)} className='bg-green-500 hover:bg-green-200 text-white ml-2'>Salvar</Button>
            </Box>

          </Box>

        </Box>
      </Estimate>



    </>
  )
}
