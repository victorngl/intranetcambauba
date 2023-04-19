import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMemo, useState } from 'react';
import SearchField from './SearchField';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
    height: '100%',
    maxHeight: 500,
    width: '90%',


};

export default function ProductsModal({ open, setOpen, products = [], handleSelectProduct }) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [busca, setBusca] = useState('');

    const filteredProducts = useMemo(() => {
        const lowerBusca = busca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
        const filtered = products
          .filter((product) => product.name
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .includes(lowerBusca))
    
        return filtered
      }, [busca, products])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="relative w-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">

                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Lista de Produtos
                            </h3>
                            <button onClick={() => handleClose()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className='p-4 justify-center space-y-2 items-center gap-3'>
                           <p className='font-semibold'>Buscar Produto</p> 
                           <SearchField onChange={ (e) => setBusca(e.target.value)} />
                        </div>

                        <div className="p-6 space-y-6">
                            <ul className="divide-y-2 space-y-6 text-gray-500 list-disc list-inside dark:text-gray-400">
                                {filteredProducts.map((product, index) => (
                                    <li className='pt-2' key={index}>
                                        <a className='font-bold'>{product.name}</a>
                                        <ul className="pl-5 mt-2 space-y-1 list-inside">
                                            <li className='font-semibold'>Preço: R$ {product.price}</li>
                                            <li><button onClick={ (e) => { handleSelectProduct(product); handleClose() } } className='font-semibold text-sm  rounded p-1 bg-blue-500 text-white'>Selecionar</button></li>
                                        </ul>
                                    </li>
                                ))}

                            </ul>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={(e) => handleClose()} type="button" className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Fechar</button>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    )

}