import React from "react";
import { Clients } from "../components/Clients";
import { ClientModal } from "../containers/ClientModal";
import { Projects } from "../components/Projects";

export const Home = () => {
    return (
        <React.Fragment>
            <ClientModal />
            <Projects />
            <hr />
            <Clients />
        </React.Fragment>
    );
};


