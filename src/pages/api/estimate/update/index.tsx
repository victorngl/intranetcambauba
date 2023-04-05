import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { id } = req.body

    console.log('aaaaaaaaaaaaaaaaaaaaa');
    console.log(req.body)

    const estimate = await prisma.estimate.update({
        where: {
            id: Number(id),
        },
        data: req.body,
    })
    res.json(estimate)
}
