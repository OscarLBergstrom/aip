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