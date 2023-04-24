import { prisma } from "../../../../db/prisma"

export default async function handler(req, res) {
    const productId = req.query.id
    const product = await prisma.product.delete({
        where: {
            id: Number(productId),
        }
    })
    res.json(product)
}
