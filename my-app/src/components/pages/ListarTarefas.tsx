import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tarefa } from '../../Models/Tarefa';

const ListarTarefas: React.FC = () => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tarefas/listar');
                setTarefas(response.data);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
                setMessage({ type: 'error', text: 'Erro ao carregar tarefas' });
            }
        };

        fetchTarefas();
    }, []);

    return (
        <div className="table-container">
            <h2 className="form-title">Lista de Tarefas</h2>
            {message && (
                <div className={`form-message ${message.type}`}>
                    {message.text}
                </div>
            )}
            {tarefas.length > 0 ? (
                <table className="custom-table">
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
                        {tarefas.map((tarefa) => (
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
            ) : (
                <div className="form-message">
                    Nenhuma tarefa cadastrada no momento.
                </div>
            )}
        </div>
    );
};

export default ListarTarefas;
