// All this is done to structure an express app in a better way
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
//const jwt_secret="aksh_server"            // We cant do this as we will create "circular dependency", admin_route file will be importing this file to get jwt_secret, while this file itself is importing admin_route to import all the routes, best way to solve this is to create  a seperate config.js file , and there we can do "module.exports=jwt_secret;".

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)      // This is a new way to use app.use     // THis basically states that whenever request comes through the route starting with "/admin", it will go to this adminRouter, which is actually a fresh express router
app.use("/user", userRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//module.exports=jwt_secret;
