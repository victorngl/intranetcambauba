import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, maxWidth } from '@mui/material'
import { useState } from 'react';

type Product = {
    name: string;
    unity?: string;
    quantity?: number;
    price: number;
    price_amount?: number;
}

export default function EstimateSelectedTable({ data, setSelectedProducts, setTotalAmount, totalAmount }) {
    //Add a item to orçamento
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

    function handleRemoveProduct<T>(index, product) {
        //Desabilita o botao para evitar bugs;
        setDeleteButtonDisabled(true);
        setSelectedProducts(oldValues => {
            setTotalAmount(totalAmount - product.price*product.quantity)
            return oldValues.filter((_, i) => i !== index)
        })
        setDeleteButtonDisabled(false);
    }

    return (
        <TableContainer className='w-fit md:w-full' component={Paper} id="selectedtable">
            <Table  size="small" aria-label="a dense table">
                <TableHead
                    >
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Preço Unitário (R$)</TableCell>
                        <TableCell align="right">Valor Total (R$)</TableCell>
                        <TableCell align="right">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">R$ {row.price}</TableCell>
                            <TableCell align="right">R$ {row.price*row.quantity}</TableCell>
                            <TableCell align="right">
                                <Button disabled={deleteButtonDisabled} onClick={e => handleRemoveProduct(index, row)} color="primary">Excluir</Button></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}