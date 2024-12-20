# Task Manager Application

A full-stack Task Manager application built with Flask Html Java script and deployed with Docker on AWS EC2.

## Features
- Create, Read, Update, and Delete tasks
- Persistent data storage using SQLite
- Modern UI with Bootstrap
- Containerized with Docker
- Deployed on AWS EC2

## Prerequisites
- AWS Account
- EC2 Instance (Ubuntu)
- Docker installed
- Git installed

## Deployment Steps

1. **Connect to EC2 Instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

2. **Install Docker (if not installed)**
```bash
sudo apt-get update
sudo apt-get install -y docker.io
sudo usermod -aG docker ubuntu
newgrp docker
```

3. **Clone the Repository**
```bash
git clone https://github.com/shivamrathod21/crud-pj721.git
cd crud-pj721
```

4. **Create Data Directory**
```bash
mkdir -p ~/task-manager-data
sudo chown ubuntu:ubuntu ~/task-manager-data
```

5. **Build and Run Docker Container**
```bash
docker build -t task-manager .
docker run -d -p 8080:8080 -v ~/task-manager-data:/app/instance task-manager
```

6. **Access the Application**
- Open your browser and visit: `http://your-ec2-ip:8080`

## Security Configuration
Make sure to configure your EC2 security group to allow:
- SSH (Port 22)
- Custom TCP (Port 8080)

## Troubleshooting

If the container stops or you need to restart:
```bash
# Stop existing container
docker stop $(docker ps -q)
docker rm $(docker ps -a -q)

# Rebuild and run
docker build -t task-manager .
docker run -d -p 8080:8080 -v ~/task-manager-data:/app/instance task-manager
```

To view logs:
```bash
docker logs $(docker ps -q)
```

To view stored tasks:
```bash
sqlite3 ~/task-manager-data/tasks.db ".mode column" ".headers on" "SELECT * FROM task;"
```

## Technologies Used
- Backend: Python Flask
- Database: SQLite
- Frontend: HTML, CSS, JavaScript, Bootstrap
- Containerization: Docker
- Deployment: AWS EC2

## Contributing
Feel free to fork this repository and submit pull requests!
