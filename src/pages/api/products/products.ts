import { prisma } from "../../../db/prisma"

export default async function handler(req, res) {
    const products = await prisma.product.findMany()
    res.json(products)
}
