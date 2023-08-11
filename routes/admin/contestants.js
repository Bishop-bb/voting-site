const router = require('express').Router()
const contestants = require('../../controllers/admin/contestants')
const role = require('../../middleware/role')

router.get('/addCon',role, contestants.addCon)
router.get('/updateContestants/:id', role, contestants.update)
router.post('/addCon', contestants.addContestants)
router.get('/conHome', role, contestants.conHome)
router.post('/updateCon', contestants.updateCon)

module.exports = router