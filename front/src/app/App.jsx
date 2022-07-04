import React from "react";
import "./App.css";
import { Main } from "../routes/Main";
import { ApolloClient, ApolloProvider, 
    InMemoryCache } from "@apollo/client";

const GQLClient = new ApolloClient({
    uri: "http://localhost:9000/graphql",
    cache: new InMemoryCache()
}); 

export const App = () => {
    return (
        <ApolloProvider client={GQLClient}>
            <section className="container">
                <Main />
            </section>
        </ApolloProvider>
    );
};


