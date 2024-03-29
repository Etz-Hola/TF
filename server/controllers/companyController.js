// controllers/companyController.js

const bcrypt = require("bcrypt");
const Company = require("../models/companyModel");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail.js");
const createActivationToken = require("../utils/createActivationToken");

exports.registerCompany = async (req, res) => {
  try {
    // Check if a company with the provided email already exists
    const existingCompany = await Company.findOne({ email: req.body.email });
    if (existingCompany) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new company object with registration data
    const newCompany = {
      companyName: req.body.companyName,
      contactPerson: req.body.contactPerson,
      email: req.body.email,
      password: hashedPassword,
      transportationType: req.body.transportationType,
    };
    // const user = {
    //   companyName: req.body.companyName,
    //   email: req.body.email,
    //   password: hashedPassword,
    // };
    const activationToken = createActivationToken(newCompany);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: newCompany.companyName }, activationCode };
    try {
      await sendMail({
        email: newCompany.email,
        subject: "Activation your Account ",
        template: "activation-mail.ejs",
        data,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email ${newCompany.email} to active your account`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }

    // Save the new company to the database
    // await newCompany.save();

    // // Respond with a success message
    // res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    // Handle any errors that occur during registration
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginCompany = async (req, res) => {
  try {
    // Check if a company with the provided email exists
    const company = await Company.findOne({ email: req.body.email });
    if (!company) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      company.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    // const token = jwt.sign({ companyId: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // // Respond with the token
    // res.status(200).json({ token });

    const roles = Object.values(company.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: company.email,
          _id: company._id,

          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { email: company.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    company.refreshToken = refreshToken;
    const result = await company.save();
    // console.log(result);
    // console.log(roles);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ roles, result, accessToken });
  } catch (error) {
    // Handle any errors that occur during login
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.activateCompany = async (req, res) => {
  try {
    const { activation_token, activation_code } = req.body;

    const newCompany = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );

    if (newCompany.activationCode !== activation_code) {
      return res.status(400).json({ error: "Invalid activation code" });
    }

    const { companyName, contactPerson, email, transportationType, password } =
      newCompany.user;

    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await Company.create({
      companyName,
      contactPerson,
      transportationType,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expired, kindly signup again" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
  
};
