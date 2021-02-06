const router = require("express").Router();
const Movie = require('../model/mongoose_model_movie');
const User = require('../model/mongoose_model_user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUserRegister, validateUserLogin } = require("./validation");
const getUserMovies = require("../functions/getUserMovies");

router.post("/register", async (req, res) => {
    try {    
        // Checking if all data are posted correctly

        const { error } = validateUserRegister(req.body)
        if(error) return res.send({error: error.details[0].message})

        // Checking if user exist in database

        const userExist = await User.findOne({username: req.body.username})
        if(userExist) return res.send({error:'Username is already in database!'})

        // hashing user password

        const hash_instruction = await bcrypt.genSalt(10)
        const hashed_password = await bcrypt.hash(req.body.password, hash_instruction)
       
        // register new user

        const user = new User({
            username: req.body.username,
            password: hashed_password,
            movies: [],
        })
        const newUser = await user.save()
        res.json({register_success: "Your account has been registered properly! Now you can login!"})
    }
    catch(err) {
        res.json({error: err});
    }
});

router.post("/login", async (req, res) => {
    try {
        // Checking if user exist in database

        const user = await User.findOne({
            username: req.body.username,
        })
        if(!user) return res.send({error: 'Username or password is wrong!'})
        
        // Password validation

        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if(!validatePassword) return res.send({error: 'Invalid password'})

        // Token assignment        
        
        const token = jwt.sign({_id: user._id}, process.env.TOKEN);

        // Getting users movies with detailed info

        const movies_array = await getUserMovies(user._id)

        res.header('auth-token', token).send({
            _id: user._doc._id, token, 
            username: user._doc.username, 
            movies: movies_array
        })              
    }
    catch(err) {
        res.json({error: err});
    }
});


module.exports = router;
