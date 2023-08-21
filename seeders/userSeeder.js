const { User } = require("../models");

const users = [
  {
    firstname: "Martin",
    lastname: "Pintos",
    email: "mpintos@gmail.com",
    password: "123",
  },
  {
    firstname: "Martin",
    lastname: "Grillo",
    email: "mgrillo@gmail.com",
    password: "123",
  },
  {
    firstname: "Camila",
    lastname: "Martinez",
    email: "camimartinez@gmail.com",
    password: "123",
  },
  {
    firstname: "Marcelo",
    lastname: "Ramos",
    email: "mramos@gmail.com",
    password: "123",
  },
  {
    firstname: "User",
    lastname: "Name",
    email: "User@user.com",
    password: "123",
  },
];

const seedUsers = async () => {
  try {
    console.log("Ejecutando seeder de usuarios...");
    await User.bulkCreate(users);
    console.log("Usuarios creados con éxito");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
};

module.exports = seedUsers();
