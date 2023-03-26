const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route  GET request /:code "code" will be used as a placeholder
// @desc  Redirect to long/original URL

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code});

        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No Url found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');   
    }

});

module.exports = router;