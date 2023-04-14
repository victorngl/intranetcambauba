import { Button } from '@mui/material';
import { useState } from 'react';
import ProductsModal from '../utils/ProductsModal';
function FilteredListProducts({ filteredProducts, handleSelectProduct }) {

    const [listProductsModal, setListProductsModal] = useState(false)

    return (
        <>
            <div className='md:w-8/12 space-y-4'>
            <ProductsModal open={listProductsModal} setOpen={setListProductsModal} />

                <div className='w-full h-5/6'>
                    <table className='w-full h-full'>
                        <tbody className='divide-y-2 divide-gray-300'>
                            {filteredProducts.map((product, index) => (
                                <tr className='items-center' key={index}>
                                    <td className="text-xs tracking-wider" >{product.name}</td>
                                    <td className="text-center px-5 whitespace-nowrap" >R$ {product.price}</td>
                                    <td className='text-center px-5'> <Button className="text-black rounded bg-blue-400 text-xs" onClick={e => handleSelectProduct(product)}>Selecionar</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='text-center w-full'><Button onClick={ (e) => {setListProductsModal(true)}} className='h-18 w-1/2 text-xs text-center text-white bg-blue-400 hover:bg-blue-300'>Mostrar mais produtos</Button></div>

            </div>
        </>

    )
}

export default FilteredListProducts;