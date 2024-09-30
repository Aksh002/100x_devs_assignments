const jwt=require("jsonwebtoken")
const { jwtSecret }=require("../config")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token=req.headers.authorization
    const words=token.split(" ")
    const jwtToken=words[1]
    const decode=jwt.verify(token,jwtSecret)
    try{
        const decode=jwt.verify(jwtToken,jwtSecret)
        if (decode.username){                   // this way
            req.username=decode.username                    // We are doing this bcs of as user is not passing any header named username, and as the route for purchases courses uses req.headers.username, we need to pass username to header from decoded jwt 
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

module.exports = userMiddleware;