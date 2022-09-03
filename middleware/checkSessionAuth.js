function checkSessionAuth(req, res, next){
    //set variable for every pug file
    if(req.session.user)
    next()
    else
    console.log()
    return res.redirect("/users/login")
}

module.exports = checkSessionAuth