// Import the necessary modules
// express: A web framework for Node.js, used to create the server and handle routes
// ApolloServer: The core of Apollo Server, used to handle GraphQL requests
// gql: A tagged template literal to define the GraphQL schema
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Initialize the Express application
const app = express();

// In-memory "database" of users
// This array holds user objects. In a real-world application, this would typically be stored in a database.
let users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
];

// Define the GraphQL schema using gql
// type User: Defines the structure of a user object
// type Query: Defines the operations (queries) that clients can perform to read data
// type Mutation: Defines the operations (mutations) that clients can perform to modify data
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        age: Int
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, age: Int): User
        updateUser(id: ID!, name: String, age: Int): User
        deleteUser(id: ID!): Boolean
    }
`;

// Define the resolvers
// Resolvers are functions that execute the logic for each query or mutation
const resolvers = {
    // Resolvers for queries (reading data)
    Query: {
        // Resolver for the `users` query: returns the list of all users
        users: () => users,
        // Resolver for the `user` query: finds a user by ID
        user: (_, { id }) => users.find(user => user.id === parseInt(id)),
    },
    // Resolvers for mutations (modifying data)
    Mutation: {
        // Resolver for `createUser` mutation: creates a new user and adds it to the list
        createUser: (_, { name, age }) => {
            // Create a new user object
            const newUser = {
                id: users.length ? users[users.length - 1].id + 1 : 1,  // Assign the next ID
                name,  // Name from the mutation input
                age: age || 0  // Age from the mutation input, default to 0 if not provided
            };
            // Add the new user to the users array
            users.push(newUser);
            return newUser;
        },
        // Resolver for `updateUser` mutation: updates an existing user's data
        updateUser: (_, { id, name, age }) => {
            // Find the index of the user by ID
            const userIndex = users.findIndex(user => user.id === parseInt(id));
            if (userIndex === -1) throw new Error("User not found");  // If the user is not found, throw an error
            const user = users[userIndex];
            // Update the user's data
            user.name = name || user.name;
            user.age = age !== undefined ? age : user.age;
            return user;
        },
        // Resolver for `deleteUser` mutation: deletes a user by ID
        deleteUser: (_, { id }) => {
            // Find the index of the user by ID
            const userIndex = users.findIndex(user => user.id === parseInt(id));
            if (userIndex === -1) return false;  // If the user is not found, return false
            // Remove the user from the array
            users.splice(userIndex, 1);
            return true;
        },
    }
};

// Create an instance of ApolloServer
// ApolloServer handles the GraphQL API, using the schema (typeDefs) and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Start the ApolloServer and then apply it as middleware to the Express app
server.start().then(res => {
    // This middleware connects ApolloServer with the Express app
    server.applyMiddleware({ app });

    // Define a route for the root URL ('/')
    app.get('/', (req, res) => {
        res.send("Welcome to GraphQL API Demo! Visit /graphql to access the API.");  // Send a welcome message
    });

    // Define a health check route
    // This can be used by clients or monitoring systems to check if the service is running
    app.get('/health', (req, res) => {
        res.json({ status: "healthy" });  // Return a JSON object indicating the service is healthy
    });

    // Start the server and listen on port 8000
    // The server will be accessible at http://localhost:8000
    app.listen({ port: 8000 }, () =>
        console.log(`Server ready at http://localhost:8000${server.graphqlPath}`)
    );
});
