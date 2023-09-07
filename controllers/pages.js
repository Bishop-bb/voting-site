const express = require('express');
const Contestants = require('../models/contestants')
const House_of_senate = require('../models/house_of_senate')
const Users = require('../models/users')
// const Homepage = require('../models/')


exports.Home=(req, res)=>{
    console.log(req.session.isLoggedIn)
    console.log('oyaaa')
    let username;
    
    
   Promise.all([Contestants.findAll(), House_of_senate.findAll()]).then(([ contestants, senate])=>{
        if(req.session.user && req.session.user.name){
            username = req.session.user.name
        }
        else if(!req.session.user){
            username = ""
        }
        res.render('index', {contestants:contestants,
            senate: senate
            , user: username})
    })
}

exports.votingPage=(req, res)=>{
    Promise.all([Contestants.findAll(), House_of_senate.findAll()]).then(([ contestants, senate])=>{
        res.render('votingPage', {contestants:contestants, senate: senate})
    })
    
}

exports.registrationPage = (req, res)=>{
    res.render('admin/user/register',{
        oldInput: req.flash('oldInput'),
        valErr: req.flash('valErr'),
        emailErr: req.flash('emailErr')
    })
}
exports.loginPage = (req, res)=>{
    res.render('admin/user/login',{
        oldInput: req.flash('oldInput'),
        valErr: req.flash('valErr'),
        invalid: req.flash('invalid')
    })
}

exports.adminHome=(req, res)=>{
     Promise.all([Users.findAll({}), Contestants.findAll(), House_of_senate.findAll({})])
     .then(([users, contestants, senate])=>{

        if(req.session.user && req.session.user.name){
            username = req.session.user.name
        }
        else if(!req.session.user){
            username = ""
        }
        res.render('admin/adminHome', {users: users, 
            contestants: contestants,
            senate: senate
            , user: username
        })
     }).catch(err=>{
        console.log(err)
     })
}