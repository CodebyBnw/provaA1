import React, { useEffect, useState } from 'react';
import { Tarefa } from '../../Models/Tarefa';

function ListarConcluidas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/tarefa/concluidas')
            .then(response => response.json())
            .then(data => setTarefas(data))
            .catch(error => console.error('Erro:', error));
    }, []);

    return (
        <div>
            <h2>Tarefas Concluídas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Descricao</th>
                        <th>CriadoEm</th>
                        <th>CategoriaId</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map(tarefa => (
                         <tr key={tarefa.tarefaId}>
                         <td>{tarefa.tarefaId}</td>
                         <td>{tarefa.titulo}</td>
                         <td>{tarefa.descricao}</td>
                         <td>{tarefa.criadoEm}</td>
                         <td>{tarefa.categoriaId}</td>
                         <td>{tarefa.status}</td>
                     </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarConcluidas;
