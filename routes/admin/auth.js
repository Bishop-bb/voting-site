const router = require('express').Router();
const auth = require('../../controllers/admin/auth')
const {check} = require('express-validator')
const User = require('../../models/users')
const bcrypt = require('bcrypt')
// const {isEmpty} = require('validator')



router.post('/register',[
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('invalid Email'),
    check('phone_number').notEmpty().withMessage('phone number is required'),
    check('password').notEmpty().withMessage('password is required').isLength({min:5}).withMessage('and should be greater than 4 characters'),
    check('confirm password').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('password does not match')
        }
        return true
     })
], auth.register)

router.post('/login', [
    check('email').isEmail().withMessage('invalid Email').custom((value, {req})=>{
        return User.findOne({
            where:{email: value}
        }).then(result=>{
            if(!result){
                throw new Error ('Invalid Email')
            }
        })
    }),
    check('password').notEmpty().withMessage('password is required')
], auth.login)

router.post('/logout', auth.logout)


module.exports = router