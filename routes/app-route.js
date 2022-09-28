const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('you have reached the application route')
})

module.exports = router