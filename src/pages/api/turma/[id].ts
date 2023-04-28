import { prisma } from "../../../db/prisma"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const turmaId = req.query.id

    const turma = await prisma.turma.findFirst(
        {
            where: {
                id: Number(turmaId),
            },
            include: {
                disciplinas: {
                    include: {
                        disciplina: true,
                        rupd: {
                            include: {
                                aluno: {
                                    include: {
                                        turma: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    );
    
    res.json(turma)
}