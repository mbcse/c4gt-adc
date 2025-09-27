const ROLES = require("../constants/roles");

const requireRole = (allowedRoles)=>{
    return (req,res,next)=>{
        const userRol=req.user?.role;

        if (!userRole){
            return res.status(403).json({error: "User role not found."});
        }

        if (!allowedRoles.includes(userRole)){
            return res.status(403).json({error: "Access denied."});
        }
        
        next();
    };
};

module.exports=requireRole;