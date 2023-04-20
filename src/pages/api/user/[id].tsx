import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const emailId = req.query.id

    const user = await prisma.user.findUnique({
        where: {
            email: emailId,
        }
    })
    res.json(user)
}
