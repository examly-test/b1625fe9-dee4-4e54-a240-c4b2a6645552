const express = require('express');
const path = require('path');
const router = express.Router();
const token_middleware = require('../middlewares/jwtauth');
router.use(express.static(path.join(__dirname, "../public")))
router.get('/', token_middleware, (req, res) => {
    if (req.status === 'exists') {
        res.sendFile(path.join(__dirname, "../public/results.html"))
    }
})
module.exports = router;