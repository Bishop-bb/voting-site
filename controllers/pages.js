const express = require('express');
const Contestants = require('../models/contestants')
const Users = require('../models/users')
// const Homepage = require('../models/')


exports.Home=(req, res)=>{
    console.log(req.session.user)
    console.log('oyaaa')
    let username;
    
    
    Contestants.findAll().then(contestants=>{
        if(req.session.user && req.session.user.name){
            username = req.session.user.name
        }
        else if(!req.session.user){
            username = ""
        }
        res.render('index', {contestants:contestants, user: username})
    })
}

exports.votingPage=(req, res)=>{
    Contestants.findAll().then(contestants=>{
        res.render('votingPage', {contestants:contestants})
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
     Promise.all([Users.findAll({limit: 5}), Contestants.findAll()])
     .then(([users, contestants])=>{
        res.render('admin/adminHome', {users: users, contestants: contestants})
     }).catch(err=>{
        console.log(err)
     })
}