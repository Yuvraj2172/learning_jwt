const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Invalid username or password", 400);
  }
  //just for demon, generally provided by the DB
  const id = new Date().getDay();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "15days",
  });
  res.status(200).json({
    msg: "user created",
    token,
  });
};

const dashboard = async (req, res) => {
  //verify
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}!`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
