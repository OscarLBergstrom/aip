# aip


## Setup MySQL database with MYSQL Dashboard

Följ denna guiden! \
https://www.youtube.com/watch?v=u96rVINbAUI

The MySQL database should have the following properties:
- Host: localhost
- Port: 3306
- Name: haip
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

## Docker

1. Start docker desktop
2. docker-compose up

## Check if MySQL docker containers works:

- `docker exec -it CONTAINER-ID mysql -u root -p`
- `show databases;`
- `use haip;`
- `show tables;`
- `select * from users;`
