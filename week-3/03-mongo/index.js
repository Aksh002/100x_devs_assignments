// All this is done to structure an express app in a better way
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)      // This is a new way to use app.use     // THis basically states that whenever request comes through the route starting with "/admin", it will go to this adminRouter, which is actually a fresh express router
app.use("/user", userRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
