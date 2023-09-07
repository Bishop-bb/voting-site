module.exports = (req, res, next)=>{
    console.log(req.session.role)
    console.log("here we go")

    if(!req.session.role == "admin"){
        res.redirect('/')
    }

    // else if(!req.session.role || req.session.role == "user"){
    //     res.redirect('/')
    // }
  
    next()
}