# Task Management API

Task Management API is a backend project built with Node.js that provides a comprehensive solution for managing users, tasks, and workspaces. The API includes functionalities to authenticate users, manage tasks, and workspaces, with built-in validation methods to ensure data integrity at every stage.

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Database Model Structure](#database-model-structure)
5. [API Endpoints](#api-endpoints)

---

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

---

## Tech Stack

- **Node.js**: Backend framework used to build the API.
- **Express.js**: Web framework for Node.js to handle HTTP requests.
- **MongoDB**: NoSQL database to store user, task, and workspace data.
- **JWT**: JSON Web Tokens for secure user authentication.

---

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/fefewas/task-management-API.git
    cd task-management-API
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=7000
    MONGO_URI=mongodb://localhost:27017/your_database
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the application:

    ```bash
    npm start
    ```

The server will be running on `http://localhost:7000`.

---

## Database Model Structure

### Users Table
| Field     | Type     | Description                          |
|-----------|----------|--------------------------------------|
| user_id   | ObjectId | Unique identifier for the user      |
| fullName  | String   | Full name of user                   |
| email     | String   | User's email address                |
| password  | String   | Encrypted password                  |
| updated_at| Date     | Date of the last update to the user |
| created_at| Date     | Timestamp of when the user was created |

### Workspaces Table
| Field         | Type     | Description                                     |
|---------------|----------|-------------------------------------------------|
| workspace_id  | ObjectId | Unique identifier for the workspace            |
| name          | String   | Name of the workspace                          |
| description   | String   | Description of the workspace                   |
| created_at    | Date     | Timestamp of when the workspace was created    |
| updated_at    | DATE     | Date of the last update to the task            |
| created_by    | ObjectId | Reference to the `user_id` of the creator      |

### Tasks Table
| Field         | Type         | Description                                               |
|---------------|--------------|-----------------------------------------------------------|
| task_id       | ObjectId     | Unique identifier for the task                           |
| title         | String       | Title of the task                                        |
| description   | String       | Description of the task                                  |
| status        | String       | Status of the task (e.g., pending, in progress, completed)|
| highlighted   | Boolean      | Highlighted state of the task                            |
| workspace_id  | INT          | Reference to the `workspace_id` of the workspace         |
| created_at    | DATE         | Date the task was created                                |
| updated_at    | DATE         | Date of the last update to the task                      |

### Links
-  A **user** can belong to multiple **workspaces** and can have multiple **tasks** assigned in those spaces.
- A **workspace** can have multiple **tasks**.
- A **task** belongs to a single **workspace**.

## API Endpoints
All endpoints in this project are organized in the routes folder.

