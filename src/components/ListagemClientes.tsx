import React, {
    Component, useState,
    ChangeEvent, FormEvent,
    useEffect
} from 'react';


import styles from "../App.module.css"
import axios from 'axios';
import { CadastroClientesInterface } from '../interfaces/CadastroClientesInterfaces';
import { Link, useParams } from 'react-router-dom';

const Listagem = () => {

    const [clientes, setClientes] = useState<CadastroClientesInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [erro, setError] = useState("");
    const { id } = useParams()

    const deletarCliente = (id: number) => {
        axios.delete('http://127.0.0.1:8000/api/cliente/delete/' + id).then(function (response) {
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
                    const response = await axios.get('http://127.0.0.1:8000/api/cliente/all');
                    setClientes(response.data.data);
                } catch (error) {
                    setError("Ocorreu um erro");
                    console.log(error);
                }
            }
            fetchData();
        })
    }

    const recuperarSenha = async (email: string) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cliente/atualizar/senha', {
                email: email,
            });

            if (response.data.status === true) {
                alert("Senha redefinida com sucesso");
            } else {
                alert("Ocorreu um erro ao redefinir a senha");
            }
        } catch (error) {
            console.error("Erro ao redefinir a senha", error);
            alert("Ocorreu um erro ao redefinir a senha. Tente novamente mais tarde.");
        }
    };


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);


        }
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/cliente/find/nome',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }

                    }).then(function (response) {
                        if (response.data.status === true) {
                            setClientes(response.data.data)
                        } else {
                            setClientes([])
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
                const response = await axios.get('http://127.0.0.1:8000/api/cliente/all');
                setClientes(response.data.data);
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
                                <form onSubmit={buscar
                                } className='row'>

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
                            <h5 className='card-title'>Listagem de Clientes</h5>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Celular</th>
                                        <th>E-mail</th>
                                        <th>CPF</th>
                                        <th>Data de Nasciemento</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Pais</th>
                                        <th>Numero</th>
                                        <th>Cep</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map(cliente => (
                                        <tr key={cliente.id}>
                                            <td>{cliente.id}</td>
                                            <td>{cliente.nome}</td>
                                            <td>{cliente.celular}</td>
                                            <td>{cliente.email}</td>
                                            <td>{cliente.cpf}</td>
                                            <td>{cliente.dataNascimento}</td>
                                            <td>{cliente.cidade}</td>
                                            <td>{cliente.estado}</td>
                                            <td>{cliente.pais}</td>
                                            <td>{cliente.numero}</td>
                                            <td>{cliente.cep}</td>
                                            <td>
                                                <div className="btn-group" role="group">
                                                    <Link to={"/atualizar/cliente/" + cliente.id} className='btn btn-primary btn-sm'> Editar </Link>
                                                    <button onClick={() => deletarCliente(cliente.id)} className="btn btn-danger btn-sm"> Excluir </button>
                                                    <button onClick={() => recuperarSenha(cliente.email)} className="btn btn-primary btn-sm">Recuperar Senha</button>
                                                </div>

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

export default Listagem