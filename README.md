
# Social Network API

Module 18 - NoSQL Challenge: Social Network API

## Description
This API social network web application allows users share their thoughts, react to friends’ thoughts, and create a friend list.

 ## Table of Contents:  
- [Demo](#demo)  
- [Installation](#installation)
- [Usage/Examples](#usage/examples)
- [Run Locally](#run-locally)
- [Badges](#badges)



## Demo

[demo video](https://user-images.githubusercontent.com/112605297/229248274-c39f7e8f-d1ce-4b10-a3ba-1a538f497f6b.mp4)


## Installation

Install node.js and mongoDB on your local environment before download this repo, for detailed information, please check for:
- Node: https://nodejs.org/
- mongoDB: https://www.mongodb.com/docs/manual/tutorial/getting-started/

For testing the server, you can use insomnia:
- https://insomnia.rest/download
## Usage/Examples

- When post a new user, you can follow the format below:
```javascript
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

- when create a new thought and make sure it's associated with a valid user id, you can follow the format below:
```
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```


## Run Locally

To run this application locally, use these following commands in the terminal:

* install all dependecies:
    ```
    npm i
    ```
* then run script in package.json:
    ```
    npm run seed
    ```
    
* finally start the server:
    ```
    npm start
    ```
    or
    ```
    npm run dev
    ```


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

![](https://img.shields.io/badge/Database-MongoDB-yellow?style=flat-square&logo=mongoDB)  

![](https://img.shields.io/badge/npm%20package-express-orange?style=flat-square&logo=npm) 

![](https://img.shields.io/badge/npm%20package-mongoose-cyan?style=flat-square&logo=npm) 

![](https://img.shields.io/badge/npm%20package-moment-%3CCOLOR%3E?style=flat-square&logo=npm)
