import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const products = await prisma.estimate.findMany({
        include: {
            status: true,
        }
    })
    res.json(products)
}
