import React from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projectQry";
import { GET_CLIENTS } from "../graphql/clientQry";
import { ADD_PROJECT } from "../graphql/projectMut";

export const ProjectModal = () => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [clientId, setClientId] = React.useState("");
    const [status, setStatus] = React.useState("new");

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            })
        }
    });

    // Get Clients for Select
    const { error, loading, data } = useQuery(GET_CLIENTS);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name === "" || description === "" || status === "") {
            return alert("Please fill in all fields");
        };

        addProject(name, description, clientId, status);
        
        setName("");
        setDescription("");
        setStatus("new");
        setClientId("");
    };

    if (loading) return null;
    if (error) return "Something went wrong";

    return (
<React.Fragment>
    {!loading && !error && (
        <React.Fragment>
        <button 
            type="button" 
            className="btn btn-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#ProjectModal"
            >
                <aside className="d-flex align-items-center">
                    <FaList className="icon" />
                    <div>New Project</div>
                </aside>
        </button>
        
        <main 
            className="modal fade" 
            tabIndex="-1"
            id="ProjectModal" 
            aria-labelledby="ProjectModalLabel" 
            aria-hidden="true">
            <section className="modal-dialog">
                <div className="modal-content">
                    <aside className="modal-header">
                        <h5 
                            className="modal-title" 
                            id="ProjectModalLabel"
                            >New Project
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close">
                        </button>
                    </aside>
                    <aside className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <section className="mb-3">
                                <label className="form-label">Name</label>
                                <input 
                                    id="name"
                                    type="text" 
                                    className="form-control" 
                                    value={name} 
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </section>
                            <section className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    id="description"                                        
                                    className="form-control" 
                                    value={description} 
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </section>
                            <section className="mb-3">
                                <label className="form-label">Status</label>
                                <select 
                                    className="form-select" 
                                    id="status" 
                                    value={status}
                                    onChange={(event) => setStatus(event.target.value)}>
                                        <option value="new">Not Started</option>
                                        <option value="progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                </select>
                            </section>
                            <section className="mb-3">
                                <label className="form-label">Client</label>
                                <select 
                                    id="clientId" 
                                    className="form-select"
                                    value={clientId}
                                    onChange={(event) => setClientId(event.target.value)}
                                    >
                                        <option value="">Select Client</option>
                                        {data.clients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                { client.name }
                                            </option>
                                        ))}  
                                </select>
                            </section>
                            <button 
                                className="btn btn-primary"
                                type="submit"
                                data-bs-dismiss="modal"
                                >Submit
                            </button>
                        </form>
                    </aside>
                </div>
            </section>
        </main>
        </React.Fragment>
    )}
</React.Fragment>
    );
};


