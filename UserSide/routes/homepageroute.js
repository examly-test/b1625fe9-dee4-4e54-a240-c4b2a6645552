const express = require('express');
const path = require('path');
const token_middleware = require('../middlewares/jwtauth');
const router = express.Router();
router.use(express.static(path.join(__dirname, "../public")))
router.get('/', token_middleware, (req, res) => {
    if (req.status === "exists") {
        res.sendFile(path.join(__dirname, "../public/homepage.html"));
    } else {
        res.redirect('/');
    }
})
module.exports = router;