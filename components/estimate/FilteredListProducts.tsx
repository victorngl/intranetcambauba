import { useState } from 'react';
import ProductsModal from '../utils/ProductsModal';
function FilteredListProducts({ filteredProducts, handleSelectProduct }) {

    const [listProductsModal, setListProductsModal] = useState(false)

    return (
        <>
            <ProductsModal open={listProductsModal} setOpen={setListProductsModal} />

            <div className='md:w-8/12 space-y-4 border-dashed border-2'>

                <div className='w-full '>
                    <table className='w-full h-full'>
                        <tbody className='divide-gray-300 space-x-2'>
                            {filteredProducts.map((product, index) => (
                                <tr className='items-center' key={index}>
                                    <td className="w-8/12 pl-4 tracking-wide" >{product.name}</td>
                                    <td className="text-right whitespace-nowrap" >R$ {product.price}</td>
                                    <td className='text-right'> <button type='button' className="text-white rounded bg-blue-500 p-2 text-xs" onClick={e => handleSelectProduct(product)}>Selecionar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='text-center w-full h-14 items-center flex justify-center'><button type='button' onClick={(e) => { setListProductsModal(true) }} className='rounded p-3 w-1/2 text-center text-white bg-blue-400 hover:bg-blue-300'>Mostrar mais produtos</button></div>

            </div>
        </>

    )
}

export default FilteredListProducts;