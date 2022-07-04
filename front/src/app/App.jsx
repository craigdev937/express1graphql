import React from "react";
import "./App.css";
import { Main } from "../routes/Main";
import { ApolloClient, gql, 
    InMemoryCache } from "@apollo/client";

const GQLClient = new ApolloClient({
    uri: "http://localhost:9000/graphql",
    cache: new InMemoryCache()
});

GQLClient
    .query({
        query: gql`
            query GET_PROJECTS {
                projects {
                    id
                    name
                    description
                    status
                }
            }
        `
    })
    .then((result) => console.log(result));

export const App = () => {
    return (
        <React.Fragment>
            <section className="container">
                <Main />
            </section>
        </React.Fragment>
    );
};


