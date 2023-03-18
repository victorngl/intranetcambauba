import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { body } = req;
  const product = await prisma.estimate.create({
    data: {
      name: body.name,
      cnpj: body.cnpj,
      status: {
        connect: {
          id: Number(body.statudId),
        }

      },
      products: body.products,
    }});
  res.json(product)
}
