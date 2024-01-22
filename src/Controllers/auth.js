const { response } = require("express")
const users = require("../Models/users")

const jwt = require("jsonwebtoken")

exports.register = async(req,res,next)=>{
    const {name, email, p_No, password} = req.body
       const _user = new users(req.body)
       const eUser = await users.findOne({email})
       if(!eUser){
         _user.save().then(newuser=>{
            req.subject = "User Registration",
            req.text = "You have successfully signed up"
        next()
        }).catch(error=>{
        return res.status(400).json({error,message:"There is an error occurred"})
       })
    }else{
        return res.status(400).json({message:"user already existed"})
    }
       
      
       console.log(req.body)
}

exports.login = async(req,res)=>{
    const {email,password} = req.body
    const eUser = await users.findOne({email})

    if(eUser){
       

        if(eUser.authenciate(password)){
         const token = jwt.sign({
            id:eUser._id
         },"MYSECRETKEY@",{
            expiresIn:"1y"
         })
         res.status(200).json({token,message:"Login Successfully"})

        }else{
            return res.status(401).json({message:"Email or Password incorrect"})
        }


    }else{
        return res.status(404).json({message:"user not found"})
    }
}


exports.findUser = async(req,res) =>{
    const user = await users.findById(req.id)
    return res.status(200).json({user})
}