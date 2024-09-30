// Middleware for handling auth
const jwt=require("jsonwebtoken")
const { jwtSecret }=require("../config")

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token=req.headers.authorization
    const words=token.split(" ")
    const jwtToken=words[1]
    try{
        const decode=jwt.verify(jwtToken,jwtSecret)
        if (decode.username){                   // this way
            req.username=decode.username
            next()
        }else{
            res.status(403).json({
                msg:"You are not authenticated"
            })
        }
    }catch(e){
        res.status(411).send({
            msg:"Incorrect inputs"
        })
    }
    
}

module.exports = adminMiddleware;