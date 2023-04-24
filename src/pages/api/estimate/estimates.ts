import { prisma } from "../../../db/prisma"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const estimates = await prisma.estimate.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        include: {
            status: true,
        }
    })
    
    res.json(estimates)
}
