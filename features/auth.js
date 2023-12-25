const express = require("express");
const Authrouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtsecretkey = "dfkjf3kejfklenuy@F$^VJHbn";

Authrouter.post("/signup", async (req, res) => {
  console.log("Sign-up requested");

  try {
    const { username, email, password } = req.body;
    const lowerCase_email = email.toLowerCase();
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return res
        .status(400)
        .send({ msg: "User with the same email id already exists." });
    }

    emptyarray = [
      '{ "id": 1, "title": "note1", "noteDesc": "this is dummy note 1.\nyou can delete all of these" }',
      '{ "id": 2, "title": "note2", "noteDesc": "this is dummy note 2" }',
    ];

    let user = new User({
      username,
      email: lowerCase_email,
      password,
      notes: emptyarray,
    });

    user = await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

Authrouter.post("/signin", async (req, res) => {
  console.log("Sign-in requested");
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const userFound = User(user);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  }

  const token = jwt.sign({ email }, jwtsecretkey);

  res.status(200).json({ token, user });
});

module.exports = Authrouter;
