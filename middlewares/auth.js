const {getUser}= require("../service/auth")


async function restrictToLoggedInUserOnly(req, res, next){
    
    const userUID = req.headers["authorization"];
    if(!userUID) return res.redirect("/login");

    const token = userUID.split("Bearer ")[1] // ["Bearer jsoijr98094383kjsiljjs"] => through split() we got ["Bearer ", "jsoijr98094383kjsiljjs"]
    const user = getUser(userUID)
    if(!user) return res.redirect("/login")
    
    req.user = user;
    
    next();
}

async function checkAuth(req, res, next){
    const userUID = req.headers["authorization"];
    const token = userUID.split("Bearer ")[1]
   
    const user = getUser(token)
    
    req.user = user;
    
    next();
}

module.exports = {restrictToLoggedInUserOnly, checkAuth};