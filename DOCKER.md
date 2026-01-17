# Docker Build & Run Commands

## Build the Docker image

docker build -t squadlog-console:latest .

## Run the container

docker run -d -p 3000:3000 --name squadlog-console squadlog-console:latest

## Using Docker Compose

docker-compose up -d

## Stop the container

docker-compose down

## View logs

docker logs squadlog-console -f

## Rebuild and restart

docker-compose up -d --build
