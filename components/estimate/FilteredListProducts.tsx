import { Button } from '@mui/material';
function FilteredListProducts({ filteredProducts, handleSelectProduct }) {

    return (
        <div className='md:w-8/12'>
            <table className='w-full'>
                <tbody className=''>
                    {filteredProducts.map((product, index) => (
                        <tr className='' key={index}>
                            <td className="w-max" >{product.name}</td>
                            <td className="w-max" >R$ {product.price}</td>
                            <td className='w-max text-right pr-10'> <Button className="text-black rounded bg-blue-400" onClick={e => handleSelectProduct(product)}>Selecionar</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FilteredListProducts;