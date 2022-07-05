import React from "react";
import { useQuery } from "@apollo/client";
import { Spinner } from "../components/Spinner";
import { GET_PROJECTS } from "../graphql/projectQry";
import { ProjectCard } from "../components/ProjectCard";

export const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    if (loading) return <Spinner />;
    if (error) return <h1>Something went Wrong!</h1>

    return (
        <main>
            {data.projects.length > 0 ? (
                <aside className="row">
                    {data.projects.map((project) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                        />
                    ))}
                </aside>
            ) : (
                <p>There are No Projects</p>
            )} 
        </main>
    );
};


