import { prisma } from "../../../db/prisma"

export default async function handler(req, res) {
    const emailId = req.query.id

    const user = await prisma.user.findUnique({
        where: {
            email: emailId,
        }
    })
    res.json(user)
}
