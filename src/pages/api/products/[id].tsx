import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const productId = req.query.id

    const product = await prisma.product.findUnique({
        where: {
            id: Number(productId),
        }
    })
    res.json(product)
}
