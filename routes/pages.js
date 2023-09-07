const router = require('express').Router()
const pages = require('../controllers/pages')
const role = require('../middleware/role')
const userStatus = require('../middleware/userStatus')
const voterStatus = require('../middleware/voterStatus')


router.get('/', pages.Home)
router.get('/votingPage', userStatus, pages.votingPage)
router.get('/register', pages.registrationPage)
router.get('/login',  pages.loginPage)


router.get('/adminHome', role, pages.adminHome)

module.exports = router