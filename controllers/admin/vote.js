const contestants = require('../../models/contestants')
const Contestants = require('../../models/contestants')
const User = require('../../models/users')

exports.vote = (req, res)=>{
    const{id} = req.body
    Contestants.findByPk(id).then(contestants=>{
        console.log(contestants)
        contestants.increment('votes')

        return contestants.save()
    }).then(contestants=>{
        console.log('now here')
        console.log(req.session.user)

        let email = req.session.user.email
        User.findOne({
            where:{
                email: email
            }

        }).then(user=>{
            console.log('found it')
            user.status = "voted"

            return user.save()
        }).then(user=>{
            
            console.log(user.status)

            return req.session.save(()=>{
                req.session.voted = true
                console.log(req.session.voted)
                console.log(req.session.isLoggedIn, "are you?")
                console.log("should work")
            })


        })

        
        res.redirect('/')
    }).catch(err=>{
        console.log(err)
    })

}