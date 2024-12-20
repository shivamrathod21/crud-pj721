# Task Manager Application

A simple CRUD application built with Flask and modern frontend technologies.

## Features

- Create, Read, Update, and Delete tasks
- Modern, responsive UI
- RESTful API backend
- Docker support
- Ready for AWS deployment

## Local Development Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

The application will be available at http://localhost:5000

## Docker Setup

1. Build the Docker image:
```bash
docker build -t task-manager .
```

2. Run the container:
```bash
docker run -p 5000:5000 task-manager
```

## AWS Deployment

To deploy to AWS:

1. Create an ECR repository
2. Push the Docker image to ECR
3. Deploy using ECS or EKS

Detailed AWS deployment instructions:

1. Install and configure AWS CLI
2. Authenticate Docker to ECR:
```bash
aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com
```

3. Tag and push the image:
```bash
docker tag task-manager:latest your-account-id.dkr.ecr.your-region.amazonaws.com/task-manager:latest
docker push your-account-id.dkr.ecr.your-region.amazonaws.com/task-manager:latest
```

4. Create an ECS cluster and service to run the container

## API Endpoints

- GET /api/tasks - List all tasks
- POST /api/tasks - Create a new task
- GET /api/tasks/<id> - Get a specific task
- PUT /api/tasks/<id> - Update a task
- DELETE /api/tasks/<id> - Delete a task
