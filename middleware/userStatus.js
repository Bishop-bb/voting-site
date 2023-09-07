const User = require('../models/users')


module.exports = (req, res, next)=>{
console.log('okayed')
console.log(req.session.user)
let email = req.session.user.email


User.findOne({
    where:{
        email: email
    }
}).then(user=>{
    if(!req.session.isLoggedIn || user.status == "voted"){
        res.redirect('/')
    }
})




next()
}