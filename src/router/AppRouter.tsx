import React from "react";

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import CadastroProfissional from "../components/CadastroProfissional";
import Listagem from "../components/ListagemClientes";
import ListagemProfissional from "../components/ListagemProfissional";
import CadastroServicos from "../components/CadastroServicos";
import ListagemServicos from "../components/ListagemServicos";
import UpdateClientes from "../components/UpdateClientes";
import UpdateProfissional from "../components/UpdateProfissional";
import UpdateServicos from "../components/UpdateServico";
import CadastroAgenda from "../components/CadastroAgenda";
import ListagemAgenda from "../components/ListagemAgenda";
import UpdateCadastroAgenda from "../components/UpdateAgenda";
import CadastroCliente from "../components/CadastroClientes";



const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro/cliente"
                    element={<CadastroCliente />} />

                <Route path="/listagem/cliente"
                    element={<Listagem />} />

                <Route path="/cadastro/profissional"
                    element={<CadastroProfissional />} />

                <Route path="/listagem/profissional"
                    element={<ListagemProfissional />} />

                <Route path="/cadastro/servicos"
                    element={<CadastroServicos />} />

                <Route path="/listagem/servicos"
                    element={<ListagemServicos />} />

                <Route path="/atualizar/cliente/:id"
                    element={<UpdateClientes />} />

                <Route path="/atualizar/profissional/:id"
                    element={<UpdateProfissional />} />

                <Route path="/atualizar/servico/:id"
                    element={<UpdateServicos />} />

                <Route path="/atualizar/Hora/:id"
                    element={<UpdateCadastroAgenda />} />

                <Route path="/cadastro/agenda"
                 element={<CadastroAgenda />} />

                <Route path="/listagem/agenda" 
                element={<ListagemAgenda />} />

               
            </Routes>
        </BrowserRouter>
    )


}

export default AppRouter;