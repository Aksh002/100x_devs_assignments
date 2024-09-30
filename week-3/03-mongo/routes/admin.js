const { Router } = require("express");  //const express=require("express")
const router = Router();                //const router=express.Router()
const adminMiddleware = require("../middleware/admin");
const { Admin } =require("../db")
const { Course } = require("../db")
const zod=require("zod");


// Admin Routes
router.post('/signup', (req, res) => {              // This does not handle "/signup" routes, this handles "/admin/signup" route 
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    // Check if admin with this username alr exist or not
    Admin.findOne({
        username:username,
        password:password
    })
    .then(function(value){
        if (!value){
            Admin.create({
                username:username,
                password:password
                /*
                username,
                password
                */
            })
            .then(function(value){
                if (value){
                    res.send({
                        msg:"admin account created succesfully"
                    })
                }
            })
            .catch(function(value){
                res.send({
                    msg:"admin account not created, some error occured"
                })
            })
        }
        else{
            res.status(403).send({
                msg:"User already exist, no need to signup"
            })
        }
    })
    
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const schema=zod.object({
        title:zod.string(),
        description:zod.string(),
        price:zod.number(),
        imageLink:zod.string()
    })
    const response=schema.safeParse(req.body)
    if (!response){
        res.status(403).send({
            msg:"Invalid Inputs"
        })
    }
    Course.create({
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        imageLink:req.body.imageLink
    }) 
    .then(function(value){
        res.json({
            msg:"Course created succesfully",
            CourseId: value._id                 // value holds the whole inputed data + id created
        })
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({})
    .then(function(response){
        let names=[]
        for(let i=0;i<response.length;i++){
            names[i]=response[i].title
        }
        res.json({
            names,
            response
        })
    })
});

module.exports = router;