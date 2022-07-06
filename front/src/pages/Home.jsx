import React from "react";
import { Clients } from "../components/Clients";
import { ClientModal } from "../containers/ClientModal";
import { ProjectModal } from "../containers/ProjectModal";
import { Projects } from "../components/Projects";

export const Home = () => {
    return (
        <React.Fragment>
            <ClientModal />
            <ProjectModal />
            <Projects />
            <hr />
            <Clients />
        </React.Fragment>
    );
};


