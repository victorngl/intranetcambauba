import * as React from 'react';

import { useRouter } from 'next/router'
import { useState } from 'react';
import ConfirmModal from '../utils/ConfirmModal';

export default function ProductsShowTable({ data }) {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false)

  const [estimateToDelete, setEstimateToDelete] = useState(null);

  const deleteEstimate = (id) => {
    if (id != undefined) {
      fetch(`/api/estimate/delete/${id}`)
        .then((response) => { return response.json(); })
    }
  }

  return (
    <>
      <ConfirmModal open={modalOpen} setOpen={setModalOpen} performerDelete={deleteEstimate} estimateId={estimateToDelete}><p>Você tem certeza que deseja excluir esse orçamento ?</p></ConfirmModal>

      <div className='hidden md:block'>
        <table className="w-fit md:w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr className='items-center'>
              <th scope="col" className="text-center py-3">Código</th>
              <th scope="col" className="text-center py-3">Nome</th>
              <th scope="col" className="text-center py-3">Unidade</th>
              <th scope="col" className="text-center py-3">Valor (R$)</th>
              <th scope="col" className="text-center py-3">Ações</th>
            </tr>
          </thead>
          <tbody className=''>
            {data.map((product, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                  #{product.id}
                </td>
                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {product.unity}</td>
                <td scope="row" className="w-32 text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                  R$ {product.price}</td>
                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                  <div className='flex gap-2 justify-center'>
                    <button className='p-2 rounded bg-red-500 text-white  hover:bg-red-200' onClick={() => { setEstimateToDelete(product.id); setModalOpen(true) }}>
                      Excluir
                    </button>
                    <button className='p-2 rounded bg-yellow-400 text-white hover:bg-yellow-200' onClick={(e) => router.push(`/orcamento/edit/${estimate.id}`)}>
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className='md:hidden space-y-3'>
        {data.map((product, index) => (
          <div className='grid grid-cols-1 shadow'>
            <div className='bg-white p-4 rounded-lg shadow space-y-2'>
              <div className='items-center space-y-3 text-lg'>
                <div className='text-sm'><label className='font-bold'>Nome: </label>{product.name}</div>
                <div className='text-sm'><label className='font-bold'>Unidade: </label>{product.unity}</div>
                <div className='text-sm'><label className='font-bold'>Preço: </label>R$ {product.price}</div>
              </div>
              <div>
                <div className='flex gap-2 justify-center'>
                  <button className='p-2 rounded bg-red-500 text-white  hover:bg-red-200' onClick={() => { setEstimateToDelete(estimate.id); setModalOpen(true) }}>
                    Excluir
                  </button>
                  <button className='p-2 rounded bg-yellow-400 text-white hover:bg-yellow-200' onClick={(e) => router.push(`/orcamento/edit/${estimate.id}`)}>
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}