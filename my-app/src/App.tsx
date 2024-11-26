import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListarTarefas from './components/pages/ListarTarefas';
import ListarConcluidas from './components/pages/ListarConcluidas';
import ListarNaoConcluidas from './components/pages/ListarNaoConcluidas';
import CadastrarTarefa from './components/pages/CadastrarTarefa';
import AlterarTarefa from './components/pages/AlterarTarefa';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className="container">
          <nav className="nav">
            <ul className="nav-list">
              <li><Link to="/" className="nav-link">HOME</Link></li>
              <li><Link to="/pages/tarefa/listar" className="nav-link">LISTAR TAREFAS</Link></li>
              <li><Link to="/pages/tarefa/listarconcluidas" className="nav-link">TAREFAS CONCLUÍDAS</Link></li>
              <li><Link to="/pages/tarefa/listarnaoconcluidas" className="nav-link">TAREFAS NÃO CONCLUÍDAS</Link></li>
              <li><Link to="/pages/tarefa/cadastrar" className="nav-link">CADASTRAR TAREFA</Link></li>
              <li><Link to="/pages/tarefa/alterar/:id" className="nav-link">ALTERAR TAREFA</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/pages/tarefa/listar" element={<ListarTarefas />} />
            <Route path="/pages/tarefa/listarconcluidas" element={<ListarConcluidas />} />
            <Route path="/pages/tarefa/listarnaoconcluidas" element={<ListarNaoConcluidas />} />
            <Route path="/pages/tarefa/cadastrar" element={<CadastrarTarefa />} />
            <Route path="/pages/tarefa/alterar/:id" element={<AlterarTarefa />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
