import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Spinner } from "../components/Spinner";
import { FETCH_PROJECT } from "../graphql/projectQry";
import { ClientInfo } from "../components/ClientInfo";

export const Project = () => {
    const { id } = useParams();
    const { error, loading, data } = useQuery(FETCH_PROJECT, {
        variables: { id } });
    if (loading) return <Spinner />;
    if (error) return <h1>Something Went Wrong</h1>;

    return (
        <React.Fragment>
            {!loading && !error && (
                <main className="mx-auto w-75 card p-5">
                    <Link 
                        to="/" 
                        className="btn btn-light 
                            btn-sm w-25 
                            d-inline ms-auto"
                        >Back
                    </Link>
                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>
                    <h5 className="mt-3">Project Status</h5>
                    <p className="lead">{data.project.status}</p>
                    <ClientInfo client={data.project.client} />
                </main>
            )}
        </React.Fragment>
    );
};


