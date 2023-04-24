import { prisma } from "../../../db/prisma"

export default async function handler(req, res) {
  const { body } = req;

  body.price = Number(body.price);
  
  const product = await prisma.product.create({
    data: body });

  res.json(product)
  

}
