const { validationResult } = require('express-validator')
const Users = require('../../models/users')
// const Contestants = require ('../../models/contestants ')
const bcrypt = require('bcrypt')

exports.userHome = (req, res)=>{
   Users.findAll().then(users=>{
    res.render('admin/user/home', {users: users})
   }).catch(err=>{
    console.log(err)
   })
}

exports.addUserPage=(req, res)=>{
 
    res.render('admin/user/add',{
        oldInput: req.flash('oldInput'),
        valErr: req.flash('valErr'),
        emailErr: req.flash('emailErr')
    })
}

exports.addUser=(req, res)=>{
    let errors = validationResult(req)
    const {name, email, phone_number, role, password} = req.body
    console.log(req.body)

    if(!errors.isEmpty()){
        const oldInput = {
            name: name,
            email: email,
            phone_number: phone_number,
            role: role
        }

        req.flash('oldInput', oldInput)
        req.flash('valErr', errors.array())
        return req.session.save(()=>{
            res.redirect('/addUser')
        })
    }

    Users.findOne({
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
                Users.create({
                    name: name,
                    email: email,
                    phone_number: phone_number,
                    password: hashedPassword,
                    role: role
                }).then(result=>{
                    res.redirect('/userHome')
                }).catch(err=>{
                    console.log(err)   
                })
            }).catch(err=>{
                console.log(err)
            })
        }       
            
        // return req.session.save(()=>{
        //     res.render('admin/user/add', {
        //      oldInput: req.flash('oldInput'),
        //      valErr: req.flash('valErr'),
        //      emailErr: req.flash('emailErr')
        //     })
        //  })
        
    })
    // .then(user=>{
    //     if (!user){
    //         console.log('not user')
            
        
    //     }
    // })
    .catch(err=>{
        console.log(err)
    })

   
}


exports.update =(req, res)=>{
    const id = req.params.id
    Users.findByPk(id).then(user=>{
        res.render('admin/user/update', {user: user})
    }).catch(err=>{
        console.log(err)
    })
}

exports.updateUser = (req, res)=>{
    const {id, name, email, phone_number, role} = req.body
     console.log(req.body.id)
    Users.findByPk(id).then(user=>{
        user.name = name
        user.email = email
        user.phone_number = phone_number
        user.role = role

        return user.save()
    }).then(user=>{
        res.redirect('/userHome')
    }).catch(err=>{
        console.log(err)
    })
}


exports.delete = (req, res)=>{

    const {id} = req.body
    console.log(id)
    Users.findByPk(id).then(user=>{
        console.log(user)
        return user.destroy()
    }).then(user=>{
        res.redirect('/userHome')
    }).catch(err=>{
        console.log(err)
    })
}