const shortid = require("shortid");
const url = require("../models/url")


async function handleGenerateShortURL(req, res){
    const body = req.body;
    const allUrls = await url.find({})
    const findObj = await url.findOne({});
    
    if(!body.url) return res.status(400).json({error: "URL is needed"})
    

    const result = await url.create({
        shortID: shortid(),
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })
    // return res.status(200).json({status: `Short url generated: ${result.shortID}`})
    return res.render("home",{
        id: result.shortID,  
    })   
    
}

async function handleRedirect(req, res){
    const shortID=req.params.shortID;
    const entry = await url.findOneAndUpdate({shortID},{$push: {
        visitHistory: {timestamps: Date.now()},
    }})
    
    res.redirect(entry.redirectURL)
    
}

async function handleAnalytics(req, res){
    const shortID = req.params.shortID;
    const result = await url.findOne({shortID});

    return res.json({totalClicks : result.visitHistory.length, analytics : result.visitHistory})
}

module.exports={
    handleGenerateShortURL,
    handleRedirect,
    handleAnalytics,
}