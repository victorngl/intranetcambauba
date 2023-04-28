import { prisma } from "../../../db/prisma"

export default async function handler(req, res) {
    const cpfId = req.query.id

    const user = await prisma.user.findUnique({
        where: {
            cpf: cpfId,
        }
    })
    res.json(user)
}
