import { useState } from 'react';

import ProductsModal from '../utils/ProductsModal';

function FilteredListProducts({ filteredProducts, handleSelectProduct }) {

    const [openModalMoreProducts, SetOpenModalMoreProducts] = useState(false);

    return (
        
        <>
            <ProductsModal open={openModalMoreProducts} setOpen={SetOpenModalMoreProducts} />

            <div className='md:w-8/12 space-y-2 border-dashed border-2 border-gray-400 p-2'>

                <div className='w-full'>
                    <table className='w-full h-full'>
                        <tbody className='divide-y-2'>
                            {filteredProducts.map((product, index) => (
                                <tr className='items-center flex justify-between space-y-3' key={index}>
                                    <td className="text-xs md:text-sm w-8/12" >{product.name}</td>
                                    <td className="text-xs md:text-sm text-right whitespace-nowrap" >R$ {product.price}</td>
                                    <td className='text-right'><button type='button' className="text-white rounded bg-blue-500 p-2 text-xs" onClick={e => handleSelectProduct(product)}>Selecionar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                                
                <div className='text-center w-full h-14 items-center flex justify-center'><button type='button' onClick={(e) => { SetOpenModalMoreProducts(true) }} className='rounded p-2 text-base text-center text-white bg-blue-500 hover:bg-blue-700'>Mostrar mais produtos</button></div>

            </div>
        </>

    )
}

export default FilteredListProducts;