import React from "react";

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import Cadastro from "../components/CadastroClientes";
import CadastroProfissional from "../components/CadastroProfissional";
import Listagem from "../components/ListagemClientes";
import ListagemProfissional from "../components/ListagemProfissional";
import CadastroServicos from "../components/CadastroServicos";
import ListagemServicos from "../components/ListagemServicos";
import UpdateClientes from "../components/UpdateClientes";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Cadastro/Cliente"
                    element={<Cadastro />} />

                <Route path="/Listagem/Cliente"
                    element={<Listagem />} />

                <Route path="/Cadastro/Profissional"
                    element={<CadastroProfissional />} />

                <Route path="/Listagem/Profissional"
                    element={<ListagemProfissional />} />

                <Route path="/Cadastro/Servicos"
                    element={<CadastroServicos />} />

                <Route path="/Listagem/Servicos"
                    element={<ListagemServicos />} />

                <Route path="/Atualizar/Cliente"
                    element={<UpdateClientes />} />

            </Routes>
        </BrowserRouter>
    )


}

export default AppRouter;