const User = require("../models/User.model");
const bcrypt = require( 'bcrypt');
const jwt = require('jsonwebtoken');


const register = async(req, res) => {
  try {
      const { name, email, password, role } = req.body;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: "Password must be at least 8 characters and contain both letters and numbers",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;


      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);


      const user = await User.create({
        name,
        email,
        role,
        password: hashedPassword,
        image: imageUrl,
      });

      res.status(201).json(user);
    } catch (err) {
    console.log("error saving user");
      res.status(500).json({ message: err.message });
    }
}

const login = async(req, res) => {
    try{
        const {email, password} = req.body

        const user = await User.findOne({email});
        const validPassword = await bcrypt.compare(password, user.password);

        if(!user && !validPassword){
            return res.status(400).json({message: "email or password are incorrect"});
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.status(200).json({token, user});
    }catch(err){
         console.error("Error during login:", err);
         res.status(500).json({ message: err.message });
    }
}

const getUser = async(req, res) => {
    try{
        const user = await User.find();
        if (user) {
            return res.status(200).json(user);
        }

    }catch(err){
        console.error("Error during getUser:", err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = { register, login, getUser };