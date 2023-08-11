const router = require('express').Router()
const pages = require('../controllers/pages')
const role = require('../middleware/role')


router.get('/', pages.Home)
router.get('/votingPage', pages.votingPage)
router.get('/register', pages.registrationPage)
router.get('/login',  pages.loginPage)


router.get('/adminHome', role, pages.adminHome)

module.exports = router