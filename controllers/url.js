const URL = require("../models/url");
const shortid  = require("shortid");

async function handleGenerateNewShortURL(req, res) {
    const shortID = shortid.generate();
    if(!req.body.url) return res.status(400).json({msg: "url is required"});
    await URL.create({
        shortId: shortID,
        redirectURL: req.body.url,
        visitHistory: [],
    });

    return res.json({id: shortID})
}

module.exports = {
    handleGenerateNewShortURL,
}