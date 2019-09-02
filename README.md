# Skyscanner clone prototype
microservices based prototype of skyscanner clone

[aws-deployed-version](http://ec2-3-14-147-254.us-east-2.compute.amazonaws.com:3000/)

# Design
* There are three Docker containers - one with React app, one with Spring Boot app and one with Postgres db
* When the app starts - db is populated with random flight data
* Containers are waiting for each other with help of wait-for-it.sh
  * React app waits for Spring Boot app to be ready
  * Spring Boot app waits for Postgres db to be ready

# Usage with Docker
* Prerequisites:
  * Docker & Docker Compose installed
  * Ports 3000, 3001 and 5432 available [not required for Docker Toolbox]
  * Chrome browser
* Clone/download the repo
* In core folder run
  * [to start the app]:
    ```
    docker-compose up 
    ```
* Visit http://localhost:3000/ [Linux, Mac OS and Docker Desktop on Windows 10] or http://[host-ip]:3000 [Docker Toolbox] (default is http://192.168.99.100:3000/)
  * To get docker host ip with Docker Toolbox run
    ```
    docker-machine ip
    ```  
# Deployment
* The app is deployed to Docker Swarm cluster running on a single node (AWS EC2 micro)
* The following commands were used to deploy the app:
  * Create Docker swarm cluster
    ```
    docker swarm init --advertise-addr 172.31.19.6
    ```
  * Create stack of services for skyscanner-clone-prototype
    ```
    env HOST_IP=3.14.147.254 docker stack deploy -c docker-compose.depl.yml skyscannerStackk
    ```
# CI/CD
 to be done
