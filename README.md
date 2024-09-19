# GraphQL API Exercise

Welcome to the GraphQL API exercise! This exercise will help you understand the basics of creating a GraphQL API using Node.js, Express, and Apollo Server. You will implement a simple API that allows you to perform CRUD operations on a list of users. By the end of this exercise, you should be familiar with setting up a GraphQL server, defining schemas, and writing queries and mutations.

## Prerequisites

Before starting this exercise, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/)

## Setup Instructions

1. **Clone the repository:**
2. **Install the dependencies:**

   ```bash
   npm install
3. **Start the server:**

   ```bash
   npm start
   ```
   The server will start and listen on http://localhost:8000. You will see a message in the console indicating that the server is ready.

## Exercise Tasks

Your task is to implement and test a simple GraphQL API with the following features:

### 1. Define the GraphQL Schema

The schema defines the structure of your API. It includes the types, queries, and mutations that the API supports. The schema for this exercise is already provided in `index.js` using the `gql` template literal.

- **User Type**: Represents a user with an `id`, `name`, and `age`.
- **Queries**:
  - `users`: Returns a list of all users.
  - `user(id: ID!)`: Returns a single user by ID.
- **Mutations**:
  - `createUser(name: String!, age: Int)`: Creates a new user.
  - `updateUser(id: ID!, name: String, age: Int)`: Updates an existing user's details.
  - `deleteUser(id: ID!)`: Deletes a user by ID.

### 2. Implement the Resolvers

Resolvers are functions that handle the logic for each query and mutation. The resolvers for this exercise are also provided in `index.js`. Review and understand how each resolver works:

- The `Query` resolvers handle fetching data.
- The `Mutation` resolvers handle creating, updating, and deleting data.

### 3. Test the API

You will use the provided `test.graphql.http` file to test your API. This file contains a series of HTTP requests that you can execute to interact with your GraphQL server.

To test the API, use an HTTP client like [Insomnia](https://insomnia.rest/), [Postman](https://www.postman.com/), or a plugin like [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for VS Code.

- **Welcome Message**: `GET http://localhost:8000/`
- **Health Check**: `GET http://localhost:8000/health`
- **Query All Users**: Fetch all users from the database.
- **Query a Single User by ID**: Fetch a specific user by their ID.
- **Create a New User**: Add a new user to the database.
- **Update an Existing User**: Modify the details of an existing user.
- **Delete a User**: Remove a user from the database.
- **Query All Users After Deletion**: Verify the user was deleted by querying all users again.

### 4. Explore the API Using Apollo Studio

Apollo Studio provides a powerful set of tools for exploring and interacting with your GraphQL API. By using the private query console and schema-generated documentation, you can gain a deeper understanding of your API's capabilities and test queries and mutations directly from your browser.

#### Step 1: Launch Apollo Studio

1. **Launch your GraphQL server**: Ensure your server is running locally by executing `npm start`.

2. **Connect to your Local GraphQL Server**:
   - Enter your server's GraphQL endpoint URL: `http://localhost:8000/graphql`.
   - Select **Query your server**
   - Apollo Studio will automatically introspect your schema and load the API's documentation.

#### Step 2: Explore Schema-Generated Documentation

Apollo Studio automatically generates documentation for your API based on the schema you defined. You can:

- **Browse Types and Fields**: Explore the `User` type, `Query`, and `Mutation` fields directly from the documentation pane.
- **Understand Arguments and Return Types**: Each query and mutation will have detailed information about the arguments it accepts and the data it returns.

#### Step 3: Test Queries and Mutations in the Query Console

Use the Apollo Studio's query console to test the various operations supported by your API:

- **Write Queries and Mutations**: You can manually write GraphQL queries and mutations or select from the pre-defined ones based on your schema.
- **Execute Requests**: Run the queries/mutations and view the results instantly in the response pane.
- **Auto-Completion and Hints**: Apollo Studio's query console provides auto-completion, making it easier to write correct queries and mutations.

## Conclusion
By completing this exercise, you should now have a better understanding of how to build and test a GraphQL API using Node.js, Express, and Apollo Server. Feel free to explore further and extend the API as you see fit!