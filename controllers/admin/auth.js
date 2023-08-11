const { validationResult } = require("express-validator")
const User = require('../../models/users')
const bcrypt = require('bcrypt')



exports.register= (req, res)=>{
    // console.log(req.body)
    let errors = validationResult(req)
    const {name, email, phone_number, password} = req.body;
    console.log(errors.array())

    if (!errors.isEmpty()){
        const oldInput = {
            name: name,
            email: email,
            phone_number: phone_number
        }
        
        req.flash('oldInput', oldInput)
        req.flash('valErr', errors.array())
        return req.session.save(()=>{
            res.redirect('/register')
        })
    }

    User.findOne({
        where:{
            email: email
        }
    }).then(user=>{
        if(user){
            console.log('user')
            req.flash('emailErr', 'email is already registered')
            return req.session.save(()=>{
                res.redirect('/addUser')
            })
        }

        else if(!user){
            console.log('no be user o')
            bcrypt.hash(password, 12).then(hashedPassword=>{
                User.create({
                    name: name,
                    email: email,
                    phone_number: phone_number,
                    password: hashedPassword,
                    role: 'user'
                }).then(result=>{
                    res.redirect('/userHome')
                }).catch(err=>{
                    console.log(err)   
                })
            }).catch(err=>{
                console.log(err)
            })
        }       
    }).catch(err=>{
        console.log(err)
    })

  
}

exports.login =(req, res)=>{
    let errors = validationResult(req)
    const {email, password} = req.body
    
    if(!errors.isEmpty()){
        const oldInput = {
            email : email
        }

        req.flash('oldInput', oldInput)
        req.flash('valErr', errors.array())

        return req.session.save(()=>{
            res.redirect('/login')
        })

       
    }

    User.findOne({
        where: {
            email: email
        }
    }).then(user=>{
        
        bcrypt.compare(password, user.password)

        .then(match=>{
            console.log(user)
        console.log('upon though')
            if(!match){
                req.flash('invalid', 'invalid details')
                return req.session.save(()=>{
                    res.redirect('/login')
                })
            }
            
            
           
            return req.session.save(()=>{
                req.session.user = user
                req.session.role = user.role
                req.session.isLoggedIn = true
                res.redirect('/')
            })

        })
    }).catch(err=>{
        console.log(err)
    })

}

exports.logout =(req, res)=>{
    return req.session.destroy(()=>{
        res.redirect('/login')
    })
}