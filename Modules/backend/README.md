# 1. Setting up

## 1.1 Init

```
$ npm init
```

- Note: I changed the entry file to app.js

## 1.2 Dependencies used

### 1.2.1 Necessary

```
$ npm install --save express body-parser mongoose
```

- ExpressJS
- Mongoose 
- Body-Parser

```
$ npm install isemail
```

- For email verification. Link: https://www.npmjs.com/package/isemail

### 1.2.2 Optional 

```
$ npm i nodemon --save
```

- This means that we dont have to restart the code each time

Run it with 

```
$ nodemon app.js
```

# 2. Running the code

## 2.1 Normal

```
$ node app.js # this is the name of the entry file 
```

## 2.2 Easier start-up (I used this)

```json
{
    "start":"node app.js" // This runs relative to the project root
}
```

# 4. Connecting to DB

## 4.1 URI

Syntax

```
mongodb://[username:password@]host1[:port1][,...hostN[:portN]]][/[database][?options]]
```

Things to change

1. Password: SUTD1111
2. Database: ACCENTURE_TICKETING

```
let dev_db_url = "mongodb+srv://Admin1:SUTD1111@escdb-anq5i.mongodb.net/ACCENTURE_TICKETING?retryWrites=true/";
```

