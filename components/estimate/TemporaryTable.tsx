import * as React from 'react';

import { Button } from '@mui/material';
import { useRouter } from 'next/router'
import { useState } from 'react';
import ConfirmModal from '../utils/ConfirmModal';

export default function EstimateShowTable({ data }) {
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

      <div className='rounded-lg shadow hidden md:block'>
        <table className='w-full'>
          <thead className='bg-gray-50 border-b-2 border-gray-200'>
            <tr>
              <th className='p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap'>Nome</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap'>CNPJ</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap'>Status</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap'>Valor Total</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Ações</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-100'>
            <tr className='bg-white'>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>AEMC</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>12636788743</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Em Andamento</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>R$ 100000</td>
              <td className='gap-2 flex'>

                <Button className='bg-red-500 text-white  hover:bg-red-200' onClick={() => { setEstimateToDelete(row.id); setModalOpen(true) }}>
                  Excluir
                </Button>
                <Button className='bg-yellow-500 text-white hover:bg-yellow-200' onClick={(e) => router.push(`/orcamento/edit/${row.id}`)}>
                  Editar
                </Button>

              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='grid grid-cols-1 gap-4 md:hidden'>
        <div className='bg-white p-4 rounded-lg shadow space-y-2'>
          <div className='items-center space-y-3 text-lg'>
            <div className='bg-blue-100'><label className='font-bold'>Nome:</label> AEMC</div>
            <div><label className='font-bold'>CNPJ:</label> 12636788743</div>
            <div><label className='font-bold'>Status:</label> Em Andamento</div>
            <div><label className='font-bold'>Valor Total:</label> R$ 1000</div>
          </div>
          <div>
            <div className='flex gap-2 justify-center'>
              <Button className='bg-red-500 text-white  hover:bg-red-200' onClick={() => { setEstimateToDelete(row.id); setModalOpen(true) }}>
                Excluir
              </Button>
              <Button className='bg-yellow-500 text-white hover:bg-yellow-200' onClick={(e) => router.push(`/orcamento/edit/${row.id}`)}>
                Editar
              </Button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}