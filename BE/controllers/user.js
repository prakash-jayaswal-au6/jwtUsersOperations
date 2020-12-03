const mongoose = require('mongoose');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')


const dotenv = require('dotenv');
dotenv.config();



exports.register_user = async (req,res) => {
    const { name, email, password, contactNo } = req.body
    console.log("The Token is data")
    console.log(req.user)   
    console.log("yes")

    if (!name || !email || !password) {
     return  res.status(422).json({error:"please Fill Mandatory fields"})
    }
    //make sure that user not exist already in database
    const user = await User.findOne({ email: email })
    if(user != null){
        return res.status(409).json({message:"user already exist can't register"});
    }
        
    bcrypt.hash(password, 10, (err, hash) => {
         let newUser = new User({
                        name:name,
                        email:email,
                        password: hash,
                        contactNo: contactNo,
                        createdBy: req.user[0]
                        
         });
        const response = newUser.save()
        console.log("registration success")
        res.status(201).json({message:"registration succesfull",User:response})
    })
                               

}


exports.login_user = (req,res,next) => {
    const {email ,password } = req.body

    if(!email || !password){
     return  res.status(422).json({error:"please Fill all fields"})
    }
    
    User.find({email:email}).exec().then(user => {
        if(user.length < 1){
            return res.status(401).json({error:"User Doesn't Exist"});
        }
        bcrypt.compare(password, user[0].password,(err,isMatch) => {
            if(err) {
               return res.status(401).json({error:"Authentication Failed"});
            } 
            
            //if password are matched
            if(isMatch){
                const {_id, name, email,phoneNo} = user[0]
                const token = jwt.sign({email: user[0].email, userId: user[0]._id},process.env.secretKey,{expiresIn:500000});
                return res.status(200).json({message:"Authentication successful",Token : token,user:{_id,name,email,phoneNo} })
            }
            //if the accound is beign verified  
            res.status(401).json({error:"Authentication Failed"});
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
}





//This route is to see the profile of the other user
exports.get_users =(req,res) => {
    User.find()
    .then(posts => {
        res.json({ posts})
    })
    .catch(err => {
        console.log(err)
    })
}


exports.delete_session = (req, res) => {
    try {
        const user = session.user;
        if (user) {
          session.destroy(err => {
            if (err) throw (err);
            res.clearCookie(process.env.SESS_NAME);
            res.send(user);
          });
        } else {
          throw new Error('Something went wrong');
        }
      } catch (err) {
        res.status(422).send(parseError(err));
      }
}

exports.update_user = (req, res) => {
    const id = req.params.id
    const { name, email, phoneNo } = req.body
    User.findOneAndUpdate(id, {$set:{ email: email,name:name,phoneNo:phoneNo }})
    .then(user=>{
            return res.status(200).json({message:user})
       
        }).catch(err=> console.log(err))
}

exports.delete_user = (req,res,next) => {
    User.deleteOne({_id: req.params.userId}).exec().then(response => {
        res.status(200).json({message:"User Deleted Succesfully"})
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
}