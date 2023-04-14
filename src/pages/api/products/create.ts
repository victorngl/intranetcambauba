import { PrismaClient } from "@prisma/client"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { body } = req;

  const product = await prisma.estimate.create({
    data: body });
    
  res.json(product)
  

}
