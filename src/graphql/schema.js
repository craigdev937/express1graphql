import { Client } from "../models/Client.js";
import { Project } from "../models/Project.js";
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
                return Client.findById(obj.clientId);
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
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID }},
            resolve(obj, args) {
                return Project.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(obj, args) {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID }},
            resolve(obj, args) {
                return Client.findById(args.id);
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery,
});


