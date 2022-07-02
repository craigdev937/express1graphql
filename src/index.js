import "dotenv/config";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema.js";

(async () => {
    const app = express();

    app.use("/graphql", graphqlHTTP({
        schema, graphiql: true
    }));

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();



