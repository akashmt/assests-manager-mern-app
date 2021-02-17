# Links

## Nodejs

[Nodejs website](https://nodejs.org/en/)

## Express

[Express website](https://expressjs.com)

### Getting Started

[Getting started](https://expressjs.com/en/starter/installing.html)

Install Express

```
$ npm install express --save
```

To install Express temporarily and not add it to the dependencies list:

```
$ npm install express --no-save
```

### Hello World

[Hello world](https://expressjs.com/en/starter/hello-world.html)

```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

Running Locally

```
$ node app.js
```

### Middleware

Application-level middleware Exmaples

[Using middleware](https://expressjs.com/en/guide/using-middleware.html)

Middleware runs on a next() in order, or it will onlyy run first function, method, route

```
app.use((req, res, next) => {
  console.log(`Hi Middleware!`);
  next();
});
```

Then next function/route will run

### Router

[Express Router](https://expressjs.com/en/5x/api.html#router)

[Route Parameters](https://expressjs.com/en/guide/routing.html)

## Mongo

[MongoDB website](https://www.mongodb.com)

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

[Login to account](https://account.mongodb.com/account/login)

## Mongoose

[Mongoose website](https://www.mongoosejs.com)

[Deprecations](https://www.mongoosejs.com/docs/deprecations.html)

Make sure these deprecations are fixed in connect.js

```
await mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
```
