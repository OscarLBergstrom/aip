# aip


## Setup MySQL database with MYSQL Dashboard

Följ denna guiden! \
https://www.youtube.com/watch?v=u96rVINbAUI

The MySQL database should have the following properties:
- Host: localhost
- Port: 3306
- Username: root
- Password: databasehaip

In order to create the structure of the database run the following commands in the workbench.

```
CREATE DATABASE haip;
```

```
USE haip;
```

```
CREATE TABLE users (
    USER_ID VARCHAR(255) PRIMARY KEY);
```

```
CREATE TABLE playlists (
    USER_ID VARCHAR(255),
    playlist VARCHAR(255) PRIMARY KEY,
    FOREIGN KEY (USER_ID) REFERENCES haip.users(USER_ID)
);
```

## Run Docker Locally

1. Start Docker Desktop
2. `docker-compose up`

### Check if MySQL docker containers works:

- `docker exec -it CONTAINER-ID mysql -u root -p`
- `show databases;`
- `use haip;`
- `show tables;`
- `select * from users;`

## Deploy app using Kubernetes in Google Cloud

1. Download Google Cloud SDK shell
2. In shell: `gcloud auth login`
3. Open Docker Desktop
4. Build Docker images:
    - `docker build -t gcr.io/haip-401908/server .`
    - `docker build -t gcr.io/haip-401908/client .`
    - `docker build -t gcr.io/haip-401908/db .`
5. Push Docker images to Google Container Registry:
    - `docker push gcr.io/haip-401908/server`
    - `docker push gcr.io/haip-401908/client`
    - `docker push gcr.io/haip-401908/db`
6. Configure kubectl to use the manually created cluster:
    - `gcloud container clusters get-credentials haip --zone=us-central1-c`
7. Apply Kubernetes configurations:
    - `kubectl apply -f server-deployment.yaml`
8. Access the app here: http://34.16.95.74:3000/

