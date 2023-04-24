import { prisma } from "../../../db/prisma"

export default async function handler(req, res) {
    const estimateId = req.query.id

    const estimate = await prisma.estimate.findUnique({
        where: {
            id: Number(estimateId),
        }
    })
    res.json(estimate)
}
