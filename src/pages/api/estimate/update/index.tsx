import { prisma } from "../../../../db/prisma"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const { id } = req.body
    
    const estimate = await prisma.estimate.update({
        where: {
            id: Number(id),
        },
        data: req.body,
    })
    res.json(estimate)
}
