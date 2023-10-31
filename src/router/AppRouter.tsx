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


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/CadastroClientes"
                    element={<Cadastro />} />

                <Route path="/ListagemClientes"
                    element={<Listagem />} />

                <Route path="/CadastroProfissionais"
                    element={<CadastroProfissional />} />

                <Route path="/ListagemProfissionais"
                    element={<ListagemProfissional />} />

            </Routes>
        </BrowserRouter>
    )


}

export default AppRouter;