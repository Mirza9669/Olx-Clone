function admin(req, res, next){
    if(req.user.role != "admin"){
        return res.status(403).send("U are not Authorised")
    }
    next()

}
module.exports = admin