import bcrypt from "bcryptjs";
import connectDb from "../config/db.js";
import genToken from "../config/token.js";
import User from "../models/user.model.js";
// export const signUp=async (req,res)=>{
//     try {
//         await connectDb()
//         const {name,email,password}=req.body
    
//         const existEmail=await User.findOne({email})
//         if(existEmail){
//             return res.status(400).json({message: "email already exist !"})
//         }

//         if(password.length<6){
//             return res.status(400).json({message:"password must be at least 6 characters !"})
//         }

//         const hashedPassword=await bcrypt.hash(password,10)
//         const user=await User.create({
//             name,password:hashedPassword,email
//         })

//         const token=await genToken(user._id)

//         res.cookie("token",token,{
//             httpOnly:true,
//              maxAge: 7 * 24 * 60 * 60 * 1000,
//             sameSite:"None",
//             secure:true
//         })
//         return res.status(201).json(user)
//     } catch (error) {
//         return res.status(500).json({message :`sign up error ${error}`})
//     }
// }
 

// export const Login=async (req,res)=>{
//     try {
//                 await connectDb()
//         const {email,password}=req.body
    
//         const user=await User.findOne({email})
//         if(!user){
//             return res.status(400).json({message: "email does not exists !"})
//         }

//         const isMatch=await bcrypt.compare(password,user.password)

//         if(!isMatch){
//             return res.status(400).json({message:"incorrect password"})
//         }

        

//         const token=await genToken(user._id)

//         res.cookie("token",token,{
//             httpOnly:true,
//             maxAge:7*24*60*60*1000,
//               sameSite:"None",
//             secure:true
//         })
//         return res.status(200).json(user)
//     } catch (error) {
//         return res.status(500).json({message :`login error ${error}`})
//     }
// }


// export const logOut=async (req,res)=>{
//     try {
//         res.clearCookie("token")
//         return res.status(200).json({message:"log out successfully"})
//     } catch (error) {
//         return res.status(500).json({message :`logout error ${error}`})
//     }
// }





// ------------------- SIGN UP -------------------
export const signUp = async (req, res) => {
  try {
    await connectDb(); // Ensure DB is connected

    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters!" });
    }

    // Check if email already exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = await genToken(user._id);

    // Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    // Return user without password
    const { password: pwd, ...userData } = user._doc;
    return res.status(201).json(userData);

  } catch (error) {
    console.error("Sign up error:", error.message);
    return res.status(500).json({ message: "Sign up failed!" });
  }
};

// ------------------- LOGIN -------------------
export const login = async (req, res) => {
  try {
    await connectDb();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    const { password: pwd, ...userData } = user._doc;
    return res.status(200).json(userData);

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Login failed!" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ message: "Logout failed!" });
  }
};