import jwt  from "jsonwebtoken";

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.barb_token;

    if(!token) return next({status: 401, message: 'Unauthorized'})

        jwt.verify(token, process.env.AUTH_SECRET, (err, user)=>{
 if (err) {
    return next({status: 403, message: 'Forbidden'});
 }

 req.user = user;
 next();
 
        });

}


export const verifyAdmin = async (req, res, next) =>{
    
    if (req.user.is_admin != true) {
            
        next({status: 401, message:"Forbidden, You are not an admin"});
        
    }
    next();
}
