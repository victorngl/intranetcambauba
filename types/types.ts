export type User = {
    id?: number;
    name: string;
    cpf: string;
    birthday?: Date;
    password: string;
}


export type Aluno = {
    id?: number;
    name: string;
    cpf?: string;
    matriculaId: number;
    serie: string;
    turma: string;
}

export type Comunicado = {
    id?: number;
    title: string;
    date: Date;
    summary?: string;
    description?: string;
    classes: [];
    file: string;
    coverPhoto?: string;
}