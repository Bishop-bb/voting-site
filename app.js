const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')




const pages = require('./routes/pages')
const contestants = require('./routes/admin/contestants')
const users = require('./routes/admin/users')
const auth = require('./routes/admin/auth')
const vote = require('./routes/admin/vote')
const house_of_senate = require('./routes/admin/house_of_senate')





const Contestants = require('./models/contestants')
const Users = require('./models/users')
const House_of_rep = require('./models/house_of_rep')
const House_of_senate = require('./models/house_of_senate')
// const Session = require('./models/sessions')





const sequelize = require('./database/connect')
const SequelizeStore = require('connect-session-sequelize')(session.Store)




Users.hasMany(House_of_rep, {foreignKey: "user_id"})

Users.hasMany(House_of_senate, {foreignKey: "user_id"})

const app = express()
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
    cookie:{}
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(flash())
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next)=>{
    res.locals.isLoggedIn = req.session.isLoggedIn
    res.locals.user = req.session.user
    res.locals.votedCon = req.session.votedCon
    res.locals.votedSen = req.session.votedSen

    next()
})



app.use(pages)
app.use(contestants)
app.use(users)
app.use(auth)
app.use(vote)
app.use(house_of_senate)
//  House_of_senate.sync({alter:true})
sequelize.sync().then(results=>{
    app.listen(3000, ()=>{
        console.log('connected to port 3000')
    })
}).catch(err=>{
    console.log(err)
})