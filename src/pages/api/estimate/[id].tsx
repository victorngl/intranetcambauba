import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const estimateId = req.query.id
    const estimate = await prisma.estimate.findUnique({
        where: {
            id: Number(estimateId),
        }
    })
    res.json(estimate)
}
