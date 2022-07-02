import { projects, clients } from "../sampleData.js";
import { 
    GraphQLObjectType, GraphQLID, GraphQLString, 
    GraphQLSchema, GraphQLList, 
} from "graphql";

// Project Type
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(obj, args) {
                return clients.find(
                    (client) => client.id === obj.clientId);
            }
        },
    })
});

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
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(obj, args) {
                return projects;
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID }},
            resolve(obj, args) {
                return projects.find(
                    (project) => project.id === args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(obj, args) {
                return clients;
            }
        },
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


