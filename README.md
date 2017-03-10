# logger_express
Logger for express Server
### Dependencies
node
express
```shell
npm init
npm install express --save
```
### Usage
1 - Download and place the files in your project root folder

2 - At your app.js or main file of express project add those lines

```javascript
var logger = require('./logger');
app.use(logger);
```

And run your server
```shell
>node app.js
```
