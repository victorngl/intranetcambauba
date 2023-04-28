import { prisma } from "../../../db/prisma"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    const comunicados = await prisma.comunicado.findMany();
    res.json(comunicados)
}