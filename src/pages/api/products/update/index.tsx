import { prisma } from "../../../../db/prisma"

export default async function handler(req, res) {
    const { id } = req.body
    
    req.body.price = Number(req.body.price);

    const product = await prisma.product.update({
        where: {
            id: Number(id),
        },
        data: req.body,
    })
    res.json(product)
}
