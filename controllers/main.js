const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Invalid username or password", 400);
  }
  //just for demon, generally provided by the DB
  const id = new Date().getTime();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "15days",
  });
  res.status(200).json({
    msg: "user created",
    token,
  });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  //   console.log('route is working fine');
  res.status(200).json({
    msg: `Hello Yuvraj Soni!`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
  console.log("working fine");
};

module.exports = {
  login,
  dashboard,
};
