import React from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT  } from "../graphql/clientMut";
import { GET_CLIENTS } from "../graphql/clientQry";

export const ClientModal = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] },
            });
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name === "" || email === "" || phone === "") {
            return alert("Please fill in all fields");
        };
        addClient(name, email, phone);
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <React.Fragment>
            <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-toggle="modal" 
                data-bs-target="#ClientModal"
                >
                    <aside className="d-flex align-items-center">
                        <FaUser className="icon" />
                        <div>Add Client</div>
                    </aside>
            </button>
            
            <main 
                className="modal fade" 
                tabIndex="-1"
                id="ClientModal" 
                aria-labelledby="ClientModalLabel" 
                aria-hidden="true">
                <section className="modal-dialog">
                    <div className="modal-content">
                        <aside className="modal-header">
                            <h5 
                                className="modal-title" 
                                id="ClientModalLabel"
                                >Add Client
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
                                    <label className="form-label">Email</label>
                                    <input 
                                        id="email"
                                        type="email" 
                                        className="form-control" 
                                        value={email} 
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </section>
                                <section className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input 
                                        id="phone"
                                        type="text" 
                                        className="form-control" 
                                        value={phone} 
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                </section>
                                <button 
                                    className="btn btn-secondary"
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
    );
};


