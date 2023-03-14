import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, maxWidth } from '@mui/material'

type Product = {
    name: string;
    unity?: string;
    quantity?: number;
    price: number;
    price_amount?: number;
}

export default function EstimateSelectedTable({ data, setSelectedProducts, setTotalAmount, totalAmount }) {
    //Add a item to orçamento

    function handleRemoveProduct<T>(index, product) {
        setSelectedProducts(oldValues => {
            setTotalAmount(totalAmount - product.price)
            return oldValues.filter((_, i) => i !== index)
        })
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: maxWidth }} size="small" aria-label="a dense table">
                <TableHead
                    sx={{
                        backgroundColor: '#0288d1',
                    }}>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">Preço (R$)</TableCell>
                        <TableCell align="right">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">R$ {row.price}</TableCell>
                            <TableCell align="right">
                                <Button onClick={e => handleRemoveProduct(index, row)} color="primary">Excluir</Button></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}