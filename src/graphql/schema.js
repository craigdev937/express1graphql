import { projects, clients } from "../sampleData.js";
import { 
    GraphQLObjectType, GraphQLID, GraphQLString, 
    GraphQLSchema
} from "graphql";

// Client Type
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID }},
            resolve(obj, args) {
                return clients.find(
                    (client) => client.id === args.id);
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery,
});


