const router = require('express').Router();
const users = require('../../controllers/admin/users')
const {check} = require('express-validator')
const role = require('../../middleware/role')


router.get('/addUser', role, users.addUserPage)
// router.get('/updateUser', users.updateUser)
router.get('/userHome', role, users.userHome)
router.get('/updateUser/:id', role, users.update)
router.post('/updateUser', users.updateUser)
router.post('/addUser',[
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('invalid Email'),
    check('phone_number').notEmpty().withMessage('phone number is required'),
    check('role').notEmpty().withMessage('select role'),
    check('password').notEmpty().withMessage('password is required').isLength({min:5}).withMessage('and should be greater than 4 characters'),
    check('confirm password').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('password does not match')
        }
        return true
     })
], users.addUser)


router.post('/delete', users.delete)

module.exports = router