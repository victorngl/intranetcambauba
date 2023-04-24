import { prisma } from "../../../db/prisma"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function handler(req, res) {
  const { body } = req;

  const estimate = await prisma.estimate.create({
    data: {
      name: body.name,
      cnpj: body.cnpj,
      status: {
        connect: {
          id: Number(body.statusId),
        }
      },
      products: body.products,
      totalprice: body.totalprice,
      author: {
        connect: {
          id: Number(body.authorId),
        }
      },
    }});
  res.json(estimate)
  

}
