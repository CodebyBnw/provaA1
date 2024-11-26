import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Categoria {
    categoriaId: string;
    nome: string;
}

const CadastrarTarefa: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categoria/listar');
                setCategorias(response.data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
                setMessage({ type: 'error', text: 'Erro ao carregar categorias' });
            }
        };

        fetchCategorias();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await axios.post('http://localhost:5000/api/tarefas/cadastrar', {
                titulo,
                descricao,
                categoriaId,
                status: "Não iniciada"
            });

            setMessage({ type: 'success', text: 'Tarefa cadastrada com sucesso!' });
            setTimeout(() => {
                navigate('/pages/tarefa/listar');
            }, 2000);
        } catch (error) {
            console.error('Erro ao cadastrar tarefa:', error);
            setMessage({ type: 'error', text: 'Erro ao cadastrar tarefa' });
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Cadastrar Nova Tarefa</h2>
            {message && (
                <div className={`form-message ${message.type}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="titulo">Título da Tarefa:</label>
                    <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoria:</label>
                    <select
                        id="categoria"
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.categoriaId} value={categoria.categoriaId}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="form-button">
                    Cadastrar Tarefa
                </button>
            </form>
        </div>
    );
};

export default CadastrarTarefa;
