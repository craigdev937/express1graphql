import React from "react";
import { Clients } from "../components/Clients";
import { ClientModal } from "../containers/ClientModal";

export const Home = () => {
    return (
        <React.Fragment>
            <ClientModal />
            <hr />
            <Clients />
        </React.Fragment>
    );
};


