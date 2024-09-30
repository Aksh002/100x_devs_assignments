const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const zod=require("zod")
const { User,Course }=require("../db")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const { username,password }=req.body

    const schema=zod.object({
        username:zod.string(),
        password:zod.number()
    })
    const response=schema.safeParse(req.body)
    if (!response){
        res.status(403).send({
            msg:"Invalid input"
        })
    }

    User.findOne({
        username,
        password
    })
    .then(function(response){
        if (!response){
            User.create({
                username,
                password
            })
            .then(function(response2){
                res.send({
                    msg:"User Account Created"
                })
            })
        }
        else{
            res.send({
                msg:"User Already exist"
            })
        }
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
    .then(function(response){
        res.json({
            response
        })
    })
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId
    const response=await Course.findById(courseId)
    if(!response){
        res.status(403).send({
            msg:"Wrong Course ID entered"})
    }
    const update=await User.updateOne({
        username:req.headers.username,
    },{
        "$push":{
            purchasedCourses: courseId
        }
    })
    res.send({
        msg:"Congo!!!!, You bought this course"
    })
    
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const user=await User.findOne({
        username:req.headers.username
    })
    // user.purchasedCourses will give the array full of ids
    const courses=await Course.find({
        _id:{
            "$in":user.purchasedCourses         // syntax used to query in mongodb to find all the courses that has the id from this list 
        }
    })
    res.json({
        courses
    })
});

module.exports = router