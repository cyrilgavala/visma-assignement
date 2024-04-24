# Annotation Tool for Machine Learning Projects

This Annotation Tool is a crucial part of the Machine Learning pipeline, enabling the creation of labeled datasets for training models.

## Features

- Upload images of invoices and receipts
- Manually annotate fields in the documents
- Save annotations into a JSON file

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version >= 18)
- npm (version >= 6)
- Docker (optional, for Docker deployment)

## Installation

- Clone the repository:

  ```bash
  git clone https://github.com/cyrilgavala/visma-assignment.git
  ```

- Navigate to the project directory:

  ```bash
  cd visma-assignment
  ```

- Install the dependencies
  ```bash
  npm install
  ```

## Local Development

To run the application locally:

```bash
npm run dev
```

This will start the development server. Open http://localhost:3000 in your browser to view the application.

# Build and Run with Docker

To build and run the application using Docker:

Build the Docker image:

```bash
docker build -t visma-assignment .
```

Run the Docker container:

```bash
docker run -p 3000:3000 visma-assignment:latest
```

This will start the Docker container and map port 8080 on your host machine to port 80 in the Docker container. Open http://localhost:3000 in your browser to view the application.
