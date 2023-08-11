const router = require('express').Router()
const vote = require('../../controllers/admin/vote')


router.post('/vote', vote.vote)

module.exports = router