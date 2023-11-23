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

    const [usuarios, setUsuarios] = useState<CadastroClientesInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [erro, setError] = useState("");
    const { id } = useParams()

    const deletarCliente = (id: number) => {
        axios.delete('http://127.0.0.1:8000/api/cliente/delete/' + id).then(function (response) {
            console.log(response.data);
            alert("Deletado com sucesso");

            async function fetchData() {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/cliente/all');
                    setUsuarios(response.data.data);
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
        }
    }

    const buscarHorario = (e: FormEvent) => {
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
                            setUsuarios(response.data.data)
                        } else {
                            setUsuarios([])
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
                setUsuarios(response.data.data);
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
                                <form onSubmit={buscarHorario} className='row'>

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
                            <h5 className='card-title'>Listagem de Usuarios</h5>
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
                                    {usuarios.map(usuario => (
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.nome}</td>
                                            <td>{usuario.celular}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.cpf}</td>
                                            <td>{usuario.dataNascimento}</td>
                                            <td>{usuario.cidade}</td>
                                            <td>{usuario.estado}</td>
                                            <td>{usuario.pais}</td>
                                            <td>{usuario.numero}</td>
                                            <td>{usuario.cep}</td>
                                            <td>
                                                <Link to={"/Atualizar/Cliente/" + usuario.id} className='btn btn-primary btn-sm'>Editar</Link>
                                                <button onClick={() => deletarCliente(usuario.id)} className="btn btn-danger btn-sm">Excluir</button>
                                                <Link to={"/Atualizar/Senha"} className='btn btn-primary btn-sm'>Atualizar senha</Link>
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