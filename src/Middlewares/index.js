const jwt = require("jsonwebtoken")
const { check , validationResult} = require("express-validator");


exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization
        console.log(token);
        if (token) {
            const data = jwt.verify(token,"MYSECRETKEY@")
            const {id} = data;
            req.id = id;
            next();
            
        } else {
            return res.status(401).json({ message: "Token is missing" })
        }
    } catch (err) {
        return res.status(401).json({ err })
    }
}

exports.ValidateForm = [
    check("name").notEmpty().withMessage("Please enter your name"),
    check("email").isEmail().withMessage("Please enter your email"),
    check("pNo").isMobilePhone().withMessage("Please enter your valid phoneNumber"),
    check("message").notEmpty().withMessage("Please enter your message"),
    check("interest").notEmpty().withMessage("Please enter your interest")

]


exports.isValidated = (req,res,next) =>{
    const errors = validationResult(req)

    if(errors.isEmpty()){
        next()
    }else{
        res.status(400).json({message:errors.array()[0]})
    }
}