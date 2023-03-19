import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { body } = req
    
    const estimate = await prisma.estimate.update({
        where: {
            id: Number(body.id),
        },
        data: body,
    })
    res.json(estimate)
}
