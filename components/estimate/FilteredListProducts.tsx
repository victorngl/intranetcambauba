import { Button } from '@mui/material';
function FilteredListProducts({ filteredProducts, handleSelectProduct }) {

    return (
        <div className='md:w-8/12'>
            <table className='w-full h-full space-y-2'>
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
    )
}

export default FilteredListProducts;