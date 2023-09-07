module.exports= (req, res, next)=>{
console.log(req.session.user)
console.log('validation')

next()
}