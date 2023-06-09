const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route  POST /api/url/shorten
// @desc Create short url
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    //check basUrl validity
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url');
    }

    //create url code
    const urlCode = shortid.generate();
    
    //check longUrl validity
    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({ longUrl });
            
            //if an URL is found
            if(url){
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                //adding url value to url variable that was not found
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.json(url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Server error...');
        }
    }
    else{
        res.status(401).json('Invalid longUrl..');
    }

})

module.exports = router;