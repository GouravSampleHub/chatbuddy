const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// get config vars
dotenv.config();

class JWT 
{
    generateAccessToken(userid) 
    {
        return jwt.sign({user:userid}, process.env.TOKEN_SECRET, 
            { expiresIn: '50m' });
    }

    authenticateToken(req) 
    {
        return new Promise((resolve,reject)=>
        {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
    
            if (token == null)
               resolve({status:false,message:"Token Not Found !"})
            else
            {
                jwt.verify(token, process.env.TOKEN_SECRET, (err,tokendata)=>
                {                    
                    if (err)
                        resolve({status:false,message:"Invalid or Expire Token !"})
                    else
                    {                    
                        req.user = tokendata.user
                        resolve({status:true})
                    }
                })
            }
        })
    }
}

module.exports = new JWT()