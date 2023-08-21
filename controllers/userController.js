const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
    }
    const { firstname, lastname, id } = user;
    const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET_KEY);
    return res.json({
      accessToken,
      firstname,
      lastname,
      email,
      id,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Internal server error" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token");
    console.log("Logueo exitoso");
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Display a listing of the resource.
async function index(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Display the specified resource.
async function show(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, email, password } = req.body;
  try {
    const newUser = await User.create({ firstname, lastname, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  const userId = req.params.id;
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update({ firstname, lastname, email, password });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Exportar los métodos del controlador.
module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  login,
  logout,
};
