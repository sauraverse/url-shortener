const sessionIDtoUserMap = new Map();

function setUser(id, user){
    return sessionIDtoUserMap.set(id, user);
}

function getUser(id){
    return sessionIDtoUserMap.get(id)
}

module.exports = {setUser, getUser};