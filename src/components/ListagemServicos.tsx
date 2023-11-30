import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from "../App.module.css";
import { CadastroServicos } from '../interfaces/CadastroServicosInterfaces';
import { Link } from 'react-router-dom';

const ListagemServicos = () => {
    const [servicos, setServicos] = useState<CadastroServicos[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    const deletarServico = (id: number) => {
        axios.delete('http://127.0.0.1:8000/api/delete/' + id).then(function (response) {
            console.log(response.data);
            if(response.data.status === true){    
                console.log(response.data);
                    alert("Deletado com sucesso");}
                else{
                    console.log(response.data);
                    alert("Ocorreu um erro ao deletar");
                }

            async function fetchData() {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/all/servico');
                    setServicos(response.data.data);
                } catch (error) {
                    setError("Ocorreu um erro");
                    console.log(error);
                }
            }
            fetchData();
        })
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();
        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/find/nome',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                        if (response.data.status === true) {
                            setServicos(response.data.data);
                        } else {
                            setServicos([])
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all/servico');
                setServicos(response.data.data)
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
                                <h5 className='card-little'>Pesquisar</h5>
                                <form onSubmit={buscar} className='row'>
                                    
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control' onChange={handleState} />
                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-success'>Pesquisar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Listagem de Serviços</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Preço</th>
                                        <th>Descrição</th>
                                        <th>Duração</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicos.map(servico => (
                                        <tr key={servico.id}>
                                            <td>{servico.id}</td>
                                            <td>{servico.nome}</td>
                                            <td>{servico.preco}</td>
                                            <td>{servico.descricao}</td>
                                            <td>{servico.duracao}</td>
                                            <td>
                                                <Link to={"/Atualizar/Servico/" + servico.id} className='btn btn-primary btn-sm'>Editar</Link>
                                                <button onClick={() => deletarServico (servico.id)} className="btn btn-danger btn-sm">Excluir</button>
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

export default ListagemServicos;