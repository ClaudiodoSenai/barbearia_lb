import React from "react";

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import Cadastro from "../components/CadastroClientes";
import Listagem from "../components/ListagemClientes";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                  <Route path = "/CadastroClientes"
                 element={<Cadastro/>}/>

                  <Route path = "/ListagemClientes"
                 element={<Listagem/>}/>
            </Routes>
        </BrowserRouter>
    )


}

export default AppRouter;