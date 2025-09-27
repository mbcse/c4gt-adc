const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

// get user profile
router.get("/profile", requireAuth, async (req,res)=>{
    try{
        const user = await prisma.user.findUnique({
            where: {id:req.user.userId},
            select: {id: true, name:true, email:true,role:true, createdAt:true},
        });
        res.json({user});
    } catch(err){
        res.status(500).json({error: "Failed to fetch user info"});
    }
});

module.exports=router;