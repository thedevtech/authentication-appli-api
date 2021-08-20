const router = require("express").Router();
const User = require("../models/user");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

//Creating a new User
router.post("/new", async (req, res, next) => {
  //Validating Data before making a User
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  //Lets check user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(200).json("User is already registered with us");

  //Hashing passwords
  var salt = await bcrypt.genSaltSync(10);
  var hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Making a new User
  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = user.save();
    res.json("Success");
    console.log(savedUser);
  } catch (error) {
    res.status(404).send("Couldn't Create your Request");
  }
});

//login
router.post("/login", async (req, res) => {
  //Validating Data before making a User
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  //Lets check user already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(404)
      .json("We couldn't find user associated with this email");

  //Checking passwords for//Checking passwords
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json("Email & Passwords don't match");

  //If everything ok
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.setHeader("auth-token", token);

  res.json(token);
});

module.exports = router;
