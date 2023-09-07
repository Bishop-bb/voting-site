const House_of_senate = require('../../models/house_of_senate')
const Contestants = require('../../models/contestants')
const User = require('../../models/users')

exports.voteCon = (req, res)=>{
    const{id} = req.body
    Contestants.findByPk(id).then(contestants=>{
        console.log(contestants)
        contestants.increment('votes')
        

        return contestants.save()
    }).then(contestants=>{
        req.session.votedCon = true

        console.log('now here')
    
        let email = req.session.user.email


        if (req.session.votedCon && req.session.votedSen) {
            // If they have voted in both categories, update their status in the database
            return User.findOne({
              where: {
                email: email
              }
            }).then((user) => {
              user.status = "voted";
              return user.save();
            }).then(() => {
                return req.session.save(()=>{
                    res.redirect('/');
                })
                
              })
          }
          else{
            return req.session.save(()=>{
                res.redirect('/votingPage');
            })
          }
       
        
        // User.findOne({
        //     where:{
        //         email: email
        //     }

        
        // }).then(user=>{
            
        //     console.log(user.status)

        
        //     res.redirect('/')

        // })

        
       
    }).catch(err=>{
        console.log(err)
    })

}


exports.voteSen = (req, res)=>{
    const{id} = req.body
    House_of_senate.findByPk(id).then(senate=>{
        console.log(senate)
        senate.increment('votes')
       
        return senate.save()
    }).then(senate=>{
        req.session.votedSen = true

        let email = req.session.user.email

        if (req.session.votedCon && req.session.votedSen) {
            // If they have voted in both categories, update their status in the database
            return User.findOne({
              where: {
                email: email
              }
            }).then((user) => {
              user.status = "voted";
              return user.save();
            }).then(() => {
                return req.session.save(()=>{
                    res.redirect('/');
                })
                
              })
          }
          else{
            return req.session.save(()=>{
                res.redirect('/votingPage');
            })
          }
       

       
        // User.findOne({
        //     where:{
        //         email: email
        //     }

        // }).then(user=>{
        //     console.log('found it')
        //     user.status = "voted"

        //     return user.save()
        // }).then(user=>{
            
        //     console.log(user.status)

        //     return req.session.save(()=>{
        //         req.session.votedSen = true
        //         console.log(req.session.votedSen)
        //         console.log(req.session.isLoggedIn, "are you not?")
        //         console.log("should work")
        //     })


        // })

        
      
    }).catch(err=>{
        console.log(err)
    })

}