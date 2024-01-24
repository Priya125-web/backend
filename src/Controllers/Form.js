const forms = require("../Models/Form")

exports.addForm = async (req, res,next) => {

    try {
        const { name, email, pno, message, interest } = req.body
        const form = new forms(req.body)
        await form.save()
        req.subject = "User Registration",
            req.text = "You have successfully signed up"
        next()

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" })
    }


}

