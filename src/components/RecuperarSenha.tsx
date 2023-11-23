import React, {
    Component, useState,
    ChangeEvent, FormEvent,
    useEffect
} from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from '../App.module.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';



const RecuperarSenha = () => {
   
    const [email, setEmail] = useState<string>("");
    const parametro = useParams();
   
    const recuperarSenha = (e: FormEvent) => {
        e.preventDefault()
        const dados = {
            email: email
        }

        axios.put ('http://127.0.0.1:8000/api/cliente/atualizar/senha',
            dados, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            
            if(response.data.success == false){
                console.log("error");
                Swal.fire({
                    title: "Erro",
                    text: "A senha não foi alterada",
                    icon: "error",
                    timer:8000
                  });
                console.log(response.data.error);
            }
            else{
                Swal.fire({
                    title: "Cadastrado",
                    text: "A senha foi alterada para o CPF do cliente",
                    icon: "success",
                    timer:10000
                  });
                window.location.href = "/Listagem/Cliente"
            }
        }).catch(function (error) {
            console.log(error);
            
        });
        console.log(dados);

    }

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "email") {
            setEmail(e.target.value)
        }
      
    }
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/cliente/find/" + parametro.id);
             
                setEmail(response.data.data.email);
              
            } catch {
                console.log("Erro ao buscar dados da api")
            }
        }
        fetchData();

    }, []);

  

    return (
        <div>
            <Header />
            <main className={styles.main} >
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>
                                Recuperar Senha
                            </h5>
                            
                            <form onSubmit={recuperarSenha} className='row g-3'>
                               
                                <div className='col-12'>
                                    <label htmlFor="email" className='form-label'>E-mail</label>
                                    <input type="e-mail" name='email'  className='form-control' value={email} required onChange={handleState} />
                                </div>

                                <div className='col-12'>
                                    <button type='submit' className='btn btn-success btn-sm' >Alterar Senha</button>
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

export default RecuperarSenha