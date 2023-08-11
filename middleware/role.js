module.exports = (req, res, next)=>{
    console.log(req.session.role)
    console.log("here we go")

    if(req.session.role && req.session.role == "admin"){
        res.redirect('/adminHome')
    }

    else if(!req.session.role || req.session.role == "user"){
        res.redirect('/')
    }
  
    next()
}