const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8700;
const User = require('./models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(express.json());


app.get('/', (req, res)=>{
    res.send("Hello there!");
})
// Register
app.post('/api/register', async (req, res)=>{
    // console.log(req.body);
    try{
       const isUser= await User.findOne({email:req.body.email})
       if(isUser){
           return res.json({message:"User already registered"});
       }
       const hashPassword = await bcrypt.hash(req.body.password,10)    
        const user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashPassword,
        })
        user.save((err,result) => {
            if(err){
                res.status(500).json({ error:err})
            }else{
                res.status(200).json({status:'ok', newuser:result})
            }
        })      
    }catch(e){
        res.json({status:'error', error:'Duplicate email.'});
    }
})

// Login
app.post('/api/login', async (req, res)=>{
    // console.log(req.body);
    try{
        const user = await User.findOne({ email:req.body.email},()=>{ 
           if(!user){
               return res.json({status:'error',error:'Invalid Login'})
           }else{
            const isPassValid = bcrypt.compare(req.body.password, user.password)
            if(isPassValid){
                const token = jwt.sign(
                    {
                     name:user.name, email:user.email
                    },'secret123')
                return res.json({status:'ok', user:token})
            }else{
             return res.json({status:'error', user:false})
            }
           }
       })
    }catch(error){
        res.send().json({status:'error',error:error});
    }
})

// Get Quote
app.get('/api/quote', async (req, res)=>{
    const token = req.headers['x.access-token'];

    try{
        const decode =jwt.verify(token, 'secret123')
        const email = decode.email;
        const user = await User.findOne({email:email})

        return res.json({status:'ok', quote:user.quote})
    }catch(error){
        // console.log(error)
        res.json({status:'error', error: 'Invalid Token'})
    }
})


// Post Quote
app.put('/api/quote', async (req, res)=>{
    const token = req.headers['x.access-token'];

    try{
        const decode = jwt.verify(token, 'secret123')
        const email = decode.email;
        await User.updateOne(
            { email: email },
            { $set: {quote:req.body.quote}}
        )
        return  res.json({status:'ok'})
    }catch(error){
        // console.log(error)
        res.json({status:'error', error: 'Invalid Token'})
    }
})




MONGODB_URI = "mongodb+srv://gauravcom:gupta123@cluster0.wzm9s.mongodb.net/Blog?retryWrites=true";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true})
	.then(console.log("Connected with database successfully.."))
	.catch((err) => console.error(err));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});