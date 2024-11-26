import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AlterarTarefa: React.FC = () => {
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const [tarefaId, setTarefaId] = useState<string>('');
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const handleAlterarStatus = async () => {
        if (!tarefaId) {
            setMessage({ type: 'error', text: 'Por favor, insira um ID de tarefa' });
            return;
        }

        try {
            const response = await axios.patch(`http://localhost:5000/api/tarefa/alterar/${tarefaId}`);

            setMessage({ type: 'success', text: `Status alterado para: ${response.data.status}` });
            setTimeout(() => {
                navigate('/pages/tarefa/listar');
            }, 2000);
        } catch (error) {
            console.error('Erro ao alterar status da tarefa:', error);
            setMessage({ type: 'error', text: 'Erro ao alterar status da tarefa' });
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Alterar Status da Tarefa</h2>
            {message && (
                <div className={`form-message ${message.type}`}>
                    {message.text}
                </div>
            )}
            <div className="form">
                <input
                    type="text"
                    value={tarefaId}
                    onChange={(e) => setTarefaId(e.target.value)}
                    placeholder="Digite o ID da tarefa"
                    className="form-input"
                />
                <button onClick={handleAlterarStatus} className="form-button">
                    Avançar Status
                </button>
            </div>
        </div>
    );
};

export default AlterarTarefa;
