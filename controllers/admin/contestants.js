// const contestants = require('../../models/contestants')
const Contestants = require('../../models/contestants')

exports.addCon= (req, res)=>{
    res.render('admin/contestants/add')
}

exports.update= (req, res)=>{
    const id = req.params.id
    
    Contestants.findByPk(id).then(contestants=>{
            res.render('admin/contestants/update', {contestants: contestants})
    }).catch(err=>{
        console.log(err)
    })

}

exports.updateCon= (req, res)=>{
    const{ id,name, image, party, logo, state_of_origin, lga, description, achievement} = req.body
    console.log(req.body.id)
    Contestants.findByPk(id).then(contestants=>{
        contestants.name = name
        contestants.image = image
        contestants.party = party
        contestants.logo = logo
        contestants.state_of_origin = state_of_origin
        contestants.lga = lga
        contestants.description = description
        contestants.achievement = achievement

        return contestants.save()
    }).then(contestants=>{
        res.redirect('/conHome')
    }).catch(err=>{
        console.log(err)
    })
}




exports.addContestants=(req, res)=>{
    console.log(req.body)
    const {name, image, party, logo, state_of_origin, lga, description, achievement} = req.body

    Contestants.create({
        name: name,
        image: image,
        party: party,
        state_of_origin: state_of_origin,
        logo: logo,
        lga: lga,
        description: description,
        achievement: achievement,
       
    }).then(result=>{
        res.redirect('/addCon')
    }).catch(err=>{
        console.log(err)
    })
}

exports.conHome=(req, res)=>{
    Contestants.findAll().then(contestants=>{
        res.render('admin/contestants/home', {
            contestants: contestants
        })

    }).catch(err=>{
        console.log(err)
    })
}