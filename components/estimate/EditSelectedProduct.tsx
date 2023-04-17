import { Button } from "@mui/material";
import { useState } from "react";

function EditSelectedProduct({ selectedProduct, setSelectedProduct, handleAddProduct }) {

    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

    function handleUnselectProduct() {
        setSelectedProduct(undefined);
    }

    const addQuantity = () => {
        let totalQuantity = selectedQuantity + 1
        setSelectedQuantity(totalQuantity)
        setSelectedProduct({...selectedProduct, quantity: totalQuantity})
    }

    const removeQuantity = () => {
        if (selectedQuantity != 1) {
            let totalQuantity = selectedQuantity - 1
            setSelectedQuantity(totalQuantity)
            setSelectedProduct({...selectedProduct, quantity: totalQuantity})
        }
    }

    const addProductList = (product) => {
        handleAddProduct(product)
        setSelectedQuantity(1);
        setSelectedProduct(undefined)
    }

    return (
        <>
            <div className='md:w-4/12 border-dashed	border-2 p-2 border-indigo-200 h-max my-5 md:my-0'>
                {selectedProduct != undefined ?
                    <div className="flex justify-center text-center">
                        <div>
                            <div className="space-y-4">
                                <p className="text-base">{selectedProduct.name}</p>
                                <p>Preço: R$ {selectedProduct.price}</p>
                            </div>

                            <div className="my-5">
                                <Button className='bg-red-400 text-white mr-5' onClick={removeQuantity}>-</Button>
                                {selectedQuantity}
                                <Button className='bg-blue-400 text-white ml-5' onClick={addQuantity}>+</Button>
                            </div>

                            <div>
                                <Button onClick={(e) => addProductList(selectedProduct)}>Adicionar Produto</Button>
                            </div>

                            <div>
                                <Button onClick={(e) => handleUnselectProduct()}>Alterar Produto</Button>
                            </div>
                        </div>
                    </div>
                    :
                    <p>Nenhum Produto Selecionado</p>
                }
            </div>
        </>
    )
}

export default EditSelectedProduct;