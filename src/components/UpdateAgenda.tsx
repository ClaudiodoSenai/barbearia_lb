import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from '../App.module.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const UpdateCadastroAgenda = () => {
    const [id, setId] = useState<number>();
    const [profissional_id, setProfissional_id] = useState<string>("");
    const [data_hora, setData_hora] = useState<string>("");
    const [profissional_idErro, setProfissional_idErro] = useState<string>("");
    const [data_horaErro, setData_horaErro] = useState<string>("")
    const parametro = useParams();
    const updateCadastrarAgenda = (e: FormEvent) => {
        setData_horaErro("")
        setProfissional_idErro("")
        e.preventDefault();

        const dados = {
            id: id,
            profissional_id: profissional_id,
            data_hora: data_hora
        }

        axios.put("http://127.0.0.1:8000/api/atualizar/horarios", dados, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.data.success === false) {
                if ('profissional_id' in response.data.error) {
                    setProfissional_idErro(response.data.error.profissional_id[0])
                }
                if ('data_hora' in response.data.error) {
                    setData_horaErro(response.data.error.data_hora[0])
                }
            }
            else{
                    window.location.href = "/listagem/agenda"
            }
        
        }).catch(function (error) {
            console.log("Ocorreu um erro ao atualizar");
        });
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/agenda/find/horario/" + parametro.id);
                setId(response.data.data.id);
                setData_hora(response.data.data.data_hora);
                setProfissional_id(response.data.data.profissional_id);

            } catch {
                console.log("Erro ao buscar dados da api")
            }
        }
        fetchData();

    }, []);


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "profissional_id") {
            setProfissional_id(e.target.value);
        }
        if (e.target.name === "data_hora") {
            setData_hora(e.target.value);
        }
    }
    return (
        <div>
            <Header />
            <main className={styles.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar Agendamento</h5>
                            <form onSubmit={updateCadastrarAgenda} className='row g-3'>


                                <div className='col-6'>
                                    <label htmlFor='profissional_id' className='form-label'>ID do Profissional</label>
                                    <input type="number" name='profissional_id' value={profissional_id} className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{profissional_idErro}</div>

                                </div>
                                <div className='col-6'>
                                    <label htmlFor='profissional_id' className='form-label'>Data e Horário</label>
                                    <input type="datetime-local" name='data_hora' value={data_hora} className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{data_horaErro}</div>

                                </div>
                                <div className='col-12'>
                                    <button type='submit' className='btn btn-success btn-sn'>Atualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default UpdateCadastroAgenda;