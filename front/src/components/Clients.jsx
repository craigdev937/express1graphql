import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ClientRow } from "./ClientRow";

const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
        }
    }
`;

export const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Something went wrong!</h1>

    return (
        <React.Fragment>
            {!loading && !error && (
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map((client) => (
                            <ClientRow 
                                key={client.id} 
                                client={client} 
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </React.Fragment>
    );
};


