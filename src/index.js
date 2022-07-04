import "dotenv/config";
import express from "express";
import colors from "colors";
import  cors from "cors";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema.js";

(async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(
        "MongoDB is now Connected!".underline.blue))
    .catch((error) => console.log(error));
    const app = express();

    app.use(cors());
    app.use("/graphql", graphqlHTTP({
        schema, graphiql: true
    }));

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();



