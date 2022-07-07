import React from "react";
import { useMutation } from "@apollo/client";
import { FETCH_PROJECT } from "../graphql/projectQry";
import { UPDATE_PROJECT } from "../graphql/projectMut";

export const EditProjectForm = ({ project }) => {
    const [name, setName] = React.useState(project.name);
    const [description, setDescription] = 
        React.useState(project.description);
    const [status, setStatus] = React.useState("");

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{
            query: FETCH_PROJECT, 
            variables: { id: project.id }
        }],
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !description || !status) {
            return alert("Please fill out all the fields");
        };
        updateProject(name, description, status);
    };

    return (
        <main className="mt-5">
            <h3>Update Project Details</h3>
            <form onSubmit={handleSubmit}>
                <section className="mb-3">
                    <label htmlFor="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </section>
                <section className="mb-3">
                    <label htmlFor="form-label">Description</label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </section>
                <section className="mb-3">
                    <label htmlFor="form-label">Status</label>
                    <select
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}>
                            <option value="new">Not Started</option>
                            <option value="progress">In Progress</option>
                            <option value="completed">Completed</option>
                    </select>
                </section>
                <button 
                    type="submit" 
                    className="btn btn-primary">
                    Submit
                </button>
            </form>
        </main>
    );
};



