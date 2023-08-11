const Senate = require('../../models/house_of_senate')

exports.addSen= (req, res)=>{
    res.render('admin/house_of_senate/add')
}

exports.update= (req, res)=>{
    const id = req.params.id
    
    Senate.findByPk(id).then(senate=>{
            res.render('admin/house_of_senate/update', {senators: senate})
    }).catch(err=>{
        console.log(err)
    })

}

exports.updateSen= (req, res)=>{
    const{ id,name, image, party, logo, state_of_origin, lga, description, achievement} = req.body
    console.log(req.body.id)
    Senate.findByPk(id).then(senators=>{
        senators.name = name
        senators.image = image
        senators.party = party
        senators.logo = logo
        senators.state_of_origin = state_of_origin
        senators.lga = lga
        

        return senators.save()
    }).then(senators=>{
        res.redirect('/senHome')
    }).catch(err=>{
        console.log(err)
    })
}




exports.addSenator=(req, res)=>{
    console.log(req.body)
    const {name, image, party, logo, state_of_origin, lga} = req.body

    Senate.create({
        name: name,
        image: image,
        party: party,
        state_of_origin: state_of_origin,
        logo: logo,
        lga: lga,
      
       
    }).then(result=>{
        res.redirect('/addCon')
    }).catch(err=>{
        console.log(err)
    })
}

exports.senHome=(req, res)=>{
    Senate.findAll().then(senators=>{
        res.render('admin/house_of_senate/home', {
            senators: senators
        })

    }).catch(err=>{
        console.log(err)
    })
}