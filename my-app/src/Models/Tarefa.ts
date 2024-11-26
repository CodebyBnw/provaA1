export interface Tarefa {
    tarefaId: string;
    titulo: string;
    descricao: string;
    criadoEm: string;
    categoriaId: string;
    categoria?: {
        categoriaId: string;
        nome: string;
    };
    status: string;
} 