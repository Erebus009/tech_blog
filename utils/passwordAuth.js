const passwordAuth = (req,res,next) => {
    if(!req.session.login){
        res.redirect('/login')
    } else {
        next()
    }
}

module.exports = passwordAuth