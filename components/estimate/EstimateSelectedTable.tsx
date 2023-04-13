import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material'
import { useEffect, useState } from 'react';

type Product = {
    name: string;
    unity?: string;
    quantity?: number;
    price: number;
    price_amount?: number;
}

export default function EstimateSelectedTable({ estimate, handleRemoveProduct }) {
    //Add a item to orçamento
    //
    return (
        <>
            <div className="flex items-center justify-between font-bold w-full mb-5">
                <p className='text-left'>Produtos Selecionados</p>
                <p className='text-right'>Valor Total: R$ {estimate.totalprice}</p>
            </div>
            <div className='w-fit md:w-full'>
                <TableContainer component={Paper} id="selectedtable">
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell className='text-sx' align="center">Quantidade</TableCell>
                                <TableCell align="center">Preço Unitário (R$)</TableCell>
                                <TableCell align="center">Valor Total (R$)</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {estimate.products.map((row, index) => (

                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.quantity}</TableCell>
                                    <TableCell align="center">R$ {row.price}</TableCell>
                                    <TableCell align="center">R$ {row.price * row.quantity}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={e => handleRemoveProduct(index, row)} color="primary">Excluir</Button></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
