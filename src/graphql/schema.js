import { Client } from "../models/Client.js";
import { Project } from "../models/Project.js";
import { 
    GraphQLObjectType, GraphQLID, GraphQLString, 
    GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, 
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

// Mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(obj, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(obj, args) {
                return Client.findByIdAndRemove(args.id);
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: {
                    type:  new GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            "new": { value: "Not Started" },
                            "progress": { value: "In Progress" },
                            "completed": { value: "Completed" },
                        }
                    }),
                    defaultValue: "Not Started",
                },
                clientId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(obj, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                });
                return project.save();
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(obj, args) {
                return Project.findByIdAndDelete(args.id);
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type:  new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: {
                            "new": { value: "Not Started" },
                            "progress": { value: "In Progress" },
                            "completed": { value: "Completed" },
                        }
                    }),
                },
            },
            resolve(obj, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status
                        },
                    },
                    { new: true }
                )
            }
        },
    },
});

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});


