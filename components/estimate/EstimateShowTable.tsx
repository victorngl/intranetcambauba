import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
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
      <TableContainer className='w-fit md:w-full bg-red-100' component={Paper}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome da Empresa</TableCell>
              <TableCell className='invisible md:visible' align="center">CNPJ</TableCell>
              <TableCell align="center">Valor Total</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Ações</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.cnpj}</TableCell>
                <TableCell align="center">R$ {row.totalprice}</TableCell>
                <TableCell align="center">{row.status.name}</TableCell>
                <TableCell align="center">
                  <div className='flex bg-blue-100 justify-center'>
                    <Button className='bg-red-500 text-white font-bold mr-2 hover:bg-red-200' onClick={() => { setEstimateToDelete(row.id); setModalOpen(true) }}>
                      Excluir
                    </Button>
                    <Button className='bg-yellow-500 text-white font-bold hover:bg-yellow-200' onClick={(e) => router.push(`/orcamento/edit/${row.id}`)}>
                      Editar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}