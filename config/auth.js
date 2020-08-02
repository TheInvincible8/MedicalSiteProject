module.exports = {
    auth: (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error_msg', 'User not Authorized');
            res.redirect('/users/login');
        }
    }
}