const AuthSchema = require('../models/auth.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await AuthSchema.findOne({ email });

    if (user) {
      return res.status(500).json({ msg: 'Bu email hesabı zaten bulunmaktadır..!' });
    }
    if (password.length < 6) {
      return res.status(500).json({ msg: 'Parolanız 6 karakterden küçük olmamalı...!' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    if (!validateEmail(email)) {
      return res.status(500).json({ msg: 'Uygun bir mail giriniz...!' });
    }
    const newUser = await AuthSchema.create({ username, email, password: passwordHash });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      status: 'Ok',
      newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await AuthSchema.findOne({ email });
    if (!user) {
      return res.status(500).json({ msg: 'Böyle bir kullanıcı bulunamadı..!' });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(500).json({ msg: 'Parolanız yanlıştır..!' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({
      status: 'Ok',
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

function validateEmail(inputText) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    return true;
  }
  else {
    return false;
  }
}

module.exports = { register, login };
