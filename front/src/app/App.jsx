import React from "react";
import "./App.css";
import { Main } from "../routes/Main";
import { ApolloClient, ApolloProvider, 
    InMemoryCache } from "@apollo/client";

    const cache = new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    clients: {
                        merge(existing, incoming) {
                            return incoming;
                        }
                    },
                    projects: {
                        merge(existing, incoming) {
                            return incoming;
                        }
                    },
                }
            }
        }
    });

const GQLClient = new ApolloClient({
    uri: "http://localhost:9000/graphql",
    cache: cache
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


