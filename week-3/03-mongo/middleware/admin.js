const { Admin } = require("../db")
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username=req.headers.username
    const password=req.headers.password
    Admin.findOne({
        username:username,
        password:password
    })
    .then(function(value){
        if (value){
            next();
        } else {
            res.status(403).json({
                msg:"Admin not found"
            })
        }
    })

}

/*
async function adminMiddleware(req, res, next) {
        // Extract username and password from headers
        const { username, password } = req.headers;

        // Find the admin in the database
        const admin = await Admin.findOne({ username, password });

        // If admin is found, proceed to the next middleware
        if (admin) {
            next();
        } else {
            // If admin is not found, return a 403 status with an error message
            res.status(403).json({
                msg: "Admin not found"
            });
        }
*/
module.exports = adminMiddleware;