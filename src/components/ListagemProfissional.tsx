import React, {
    Component, useState,
    ChangeEvent, FormEvent,
    useEffect
} from 'react';


import styles from "../App.module.css"
import axios from 'axios';
import { CadastroProfissionalInterface } from '../interfaces/CadastroProfissionalInterfaces';
import { Link, useParams } from 'react-router-dom';

const ListagemProfissional = () => {

    const [profissionais, setProfissional] = useState<CadastroProfissionalInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [erro, setError] = useState("");

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }
    const { id } = useParams()
    const deletarProfissional = (id: number) => {
        axios.delete('http://127.0.0.1:8000/api/profissional/delete/' + id).then(function (response) {
            console.log(response.data);
           
            alert("Deletado com sucesso");

            async function fetchData() {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/profissional/all');
                    setProfissional(response.data.data);
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
                const response = await axios.post('http://127.0.0.1:8000/api/profissional/find/nome',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }

                    }).then(function (response) {
                        if (response.data.status === true) {
                            setProfissional(response.data.data)
                        } else {
                            setProfissional([])
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
                const response = await axios.get('http://127.0.0.1:8000/api/profissional/all');
                setProfissional(response.data.data);
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
                                        <button type='submit' className='btn btn-success'> Pesquisar </button>
                                    </div>
                                </form>

                            </div>

                        </div>

                    </div>

                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Listagem de Profissionais</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Celular</th>
                                        <th>E-mail</th>
                                        <th>CPF</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Pais</th>
                                        <th>Rua</th>
                                        <th>Numero</th>
                                        <th>Bairro</th>
                                        <th>Cep</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profissionais.map(profissionais => (
                                        <tr key={profissionais.id}>
                                            <td>{profissionais.id}</td>
                                            <td>{profissionais.nome}</td>
                                            <td>{profissionais.celular}</td>
                                            <td>{profissionais.email}</td>
                                            <td>{profissionais.cpf}</td>

                                            <td>{profissionais.cidade}</td>
                                            <td>{profissionais.estado}</td>
                                            <td>{profissionais.pais}</td>
                                            <td>{profissionais.rua}</td>
                                            <td>{profissionais.numero}</td>
                                            <td>{profissionais.bairro}</td>
                                            <td>{profissionais.cep}</td>





                                            <td>
                                                <Link to={"/Atualizar/Profissional/" + profissionais.id} className='btn btn-primary btn-sm'>Editar</Link>
                                                <button onClick={() => deletarProfissional(profissionais.id)} className="btn btn-danger btn-sm">Excluir</button>
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

export default ListagemProfissional