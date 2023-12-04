import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from "../App.module.css";
import { CadastroAgendaInterface } from '../interfaces/CadastroAgendaInterfaces';
import { CadastroProfissionalInterface } from '../interfaces/CadastroProfissionalInterfaces';

const ListagemAgenda = () => {
    const [selectedProfissional, setSelectedProfissional] = useState('');
    const [horarios, setHorarios] = useState<CadastroAgendaInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [profissionais, setProfissionais] = useState<CadastroProfissionalInterface[]>([]);
    const [error, setError] = useState("");
    const { id } = useParams()
    const deletarHorario = (id: number) => {

        axios.delete('http://127.0.0.1:8000/api/agenda/delete/' + id).then(function (response) {
            if (response.data.status === true) {
                console.log(response.data);
                alert("Deletado com sucesso");
            }
            else {
                console.log(response.data);
                alert("Ocorreu um erro ao deletar");
            }
            async function fetchData() {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/horarios/profissionais');
                    setHorarios(response.data.data);
                } catch (error) {
                    setError("Ocorreu um erro");
                    console.log(error);
                }
            }
            fetchData();
        })
    }

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    const buscar = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/agenda/find/data/',
                { profissional_id: selectedProfissional, data_hora: pesquisa },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.status === true) {
                setHorarios(response.data.data);
            } else {
                setHorarios([]);
            }
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const profissionalList = await axios.get('http://127.0.0.1:8000/api/profissional/all');
                setProfissionais(profissionalList.data.data);

                const response = await axios.get('http://127.0.0.1:8000/api/horarios/profissionais');
                setHorarios(response.data.data);
            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <main className={styles.main}>
                <div className='container'>
                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>

                                <select className='form-control' value={selectedProfissional}
                                    onChange={(e) => setSelectedProfissional(e.target.value)}
                                >
                                    <option value='0'>Todos os Profissionais</option>
                                    {profissionais.map(profissionais => (
                                        <option key={profissionais.id} value={profissionais.id}>{profissionais.nome}</option>
                                    ))}
                                </select>
                                <div className="row">
                                    <div className="col-10">
                                        <input type="datetime-local" name='pesquisa' className='form-control' onChange={handleState} />
                                    </div>
                                    <div className="col-12">
                                        <button type='submit' className='btn btn-success'> Pesquisar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Listagem de Agendamentos</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Profissional ID</th>
                                        <th>Data e Horário</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {horarios.map(horario => (
                                        <tr key={horario.id}>
                                            <td>{horario.id}</td>
                                            <td>{horario.profissional_id}</td>
                                            <td>{horario.data_hora}</td>
                                            <td>
                                                <Link to={"/atualizar/hora/" + horario.id} className='btn btn-primary btn-sm'>Editar</Link>
                                                <a href="#" onClick={() => deletarHorario(horario.id)} className='btn btn-danger btn-sm'>Excluir</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ListagemAgenda;