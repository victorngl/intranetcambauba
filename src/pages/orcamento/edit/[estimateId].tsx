import React, { useEffect, useState, useMemo, useRef } from 'react';

import Divider from '../../../../components/utils/Divider';
import Navbar from '../../../../components/utils/Navbar';
import Container from '../../../../components/estimate/Container';
import SearchField from '../../../../components/estimate/SearchField';
import EstimateSelectedTable from '../../../../components/estimate/EstimateSelectedTable';
import EditSelectedProduct from '../../../../components/estimate/EditSelectedProduct';
import FilteredListProducts from '../../../../components/estimate/FilteredListProducts';
import CompanyInfo from '../../../../components/estimate/CompanyInfo';
import Footer from '../../../../components/footer/Footer';
import Header from '../../../../components/header/Header';

import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Product } from '../../../../types/types';
import ExportEstimateExcel from '../../../../components/estimate/ExportEstimateExcel';
import Head from 'next/head';


export default function EditPage() {
  const router = useRouter();
  const { estimateId } = router.query;

  const notifySaveSuccefull = () => toast.success("Orçamento editado com sucesso!");

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

  const [busca, setBusca] = useState('');

  useEffect(() => {
    if (estimateId != undefined) {
      fetch(`/api/estimate/${estimateId}`)
        .then((response) => { return response.json(); })
        .then(data => {
          setEstimate(data);
        })
    }

    fetch('/api/products/products')
      .then((response) => { return response.json(); })
      .then(data => { setProducts(data) })

  }, [estimateId])

  const saveEstimate = async (e) => {
    e.preventDefault();

    fetch("/api/estimate/update", {
      method: "POST",
      body: JSON.stringify(estimate),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        notifySaveSuccefull()
        router.push('/orcamento')
      }
      return response.json();
    })
  };

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

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
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
        <title>Eficaz - Editar Orçamento</title>
      </Head>
      
      <Navbar />
      <Container>

        <div className='h-12 border-b-2 divide-secondary mb-5'>
          <h4 className="text-2xl font-bold dark:text-white">Criar orçamento</h4>
        </div>

        <form onSubmit={(e) => saveEstimate(e)}>

          <CompanyInfo estimate={estimate} setEstimate={setEstimate} />

          <div className='font-bold text-lg'>
            
            <div>
              <p>Buscar Produtos</p>
              <SearchField onChange={(e) => setBusca(e.target.value)} />
            </div>

            <Divider className='my-4' />

            <div className='w-full md:flex md:space-x-4 mb-10'>
              <FilteredListProducts filteredProducts={filteredProducts} handleSelectProduct={handleSelectProduct} />
              <EditSelectedProduct selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} handleAddProduct={handleAddProduct} />
            </div>

            <Divider className='my-4' />
            <EstimateSelectedTable estimate={estimate} handleRemoveProduct={handleRemoveProduct} />
            <Divider className='my-4' />

            <div className='flex'>
              <div className='w-6/12 text-left flex gap-8'>
                <button type='submit' className='p-4 rounded text-sm bg-green-500 hover:bg-green-800 text-white'>Salvar</button>
                <ExportEstimateExcel estimate={estimate} />
              </div>
            </div>

          </div>

        </form>

      </Container>
      <Footer />

    </>
  )
}

// <ExportEstimateExcel estimate={estimate} selectedProducts={estimate.products} />


