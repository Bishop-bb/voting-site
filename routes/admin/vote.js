const router = require('express').Router()
const vote = require('../../controllers/admin/vote')


router.post('/vote', vote.voteCon)

router.post('/voteSen', vote.voteSen)

module.exports = router