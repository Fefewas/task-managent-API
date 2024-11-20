# Task Management API

Task Management API is a backend project built with Node.js that provides a comprehensive solution for managing users, tasks, and workspaces. The API includes functionalities to authenticate users, manage tasks, and workspaces, with built-in validation methods to ensure data integrity at every stage.

## Features

### User Management
- **Register Users**: Secure user registration with data validation.
- **Authenticate Users**: JWT-based authentication to secure endpoints.
- **Update User Details**: Modify user information such as email or password.
- **View User Information**: Retrieve details of a specific user.
- **Search Users**: Search for users by different criteria.
- **Delete Users**: Remove users from the system.

### Task Management
- **Create Tasks**: Add tasks with required details such as description, priority, and due date.
- **View Tasks**: Retrieve all tasks or individual tasks.
- **Update Tasks**: Modify existing tasks, including status, description, and due date.
- **Delete Tasks**: Remove tasks from the system.

### Workspace Management
- **Create Workspaces**: Create workspaces for organizing tasks.
- **View Workspaces**: Retrieve all workspaces or specific ones.
- **Update Workspaces**: Modify workspace details.
- **Delete Workspaces**: Remove workspaces from the system.

### Validation
- All user, task, and workspace data undergo rigorous validation to ensure proper data integrity when creating or updating entities. This includes checks for required fields, data types, and format validation (e.g., email format).

## Tech Stack

- **Node.js**: Backend framework used to build the API.
- **Express.js**: Web framework for Node.js to handle HTTP requests.
- **MongoDB**: NoSQL database to store user, task, and workspace data.
- **JWT**: JSON Web Tokens for secure user authentication.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/task-management-API.git
    cd task-management-API
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/taskdb
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the application:

    ```bash
    npm startÑ
    ```

The server will be running on `http://localhost:5000`.

## API Endpoints

You can find all the end points  in this project in the routes folder.
