import { prisma } from "../../../db/prisma"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const disciplinaId = req.query.id

    const turma = await prisma.Turmas_Disciplinas.findFirst(
        {
            where: {
                id: Number(disciplinaId),
            },
            include: {
                rupd: {
                    include: {
                        aluno: true,
                    }
                },
                disciplina: true,
            }
        },
    );
    
    res.json(turma)
}