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

      <TableContainer component={Paper}>
        
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome da Empresa</TableCell>
              <TableCell align="right">CNPJ</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Ações</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.cnpj}</TableCell>
                <TableCell align="right">{row.status.name}</TableCell>
                <TableCell align="right">
                  <Button className='bg-red-500 text-white font-bold mr-2 hover:bg-red-200' onClick={() => {setEstimateToDelete(row.id); setModalOpen(true)}}>
                    Excluir
                  </Button>
                  <Button className='bg-yellow-500 text-white font-bold hover:bg-yellow-200' onClick={(e) => router.push(`/orcamento/edit/ ${row.id}`)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}