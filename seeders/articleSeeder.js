const { Article, User } = require("../models");

/*const articleOne = {
  title: "Título Primer Artículo",
  content: "Contenido del primer artículo.",
  image: "articulo1.jpg",
};

const articleTwo = {
  title: "Título Segundo Artículo",
  content: "Contenido del segundo artículo.",
  image: "articulo1.jpg",
};

const articleThree = {
  title: "Título Tercer Artículo",
  content: "Contenido del tercer artículo.",
  image: "articulo1.jpg",
};

const articleFour = {
  title: "Título Tercer Artículo",
  content: "Contenido del tercer artículo.",
  image: "articulo1.jpg",
};

const articleFive = {
  title: "Título Quinto Artículo",
  content: "Contenido del quinto artículo.",
  image: "articulo1.jpg",
};*/

const articles = [
  {
    title: "Título Primer Artículo",
    content: "Contenido del primer artículo.",
    image: "articulo1.jpg",
  },
  {
    title: "Título Segundo Artículo",
    content: "Contenido del segundo artículo.",
    image: "articulo1.jpg",
  },
  {
    title: "Título Tercer Artículo",
    content: "Contenido del tercer artículo.",
    image: "articulo1.jpg",
  },
  {
    title: "Título Cuarto Artículo",
    content: "Contenido del cuarto artículo.",
    image: "articulo1.jpg",
  },
  {
    title: "Título Quinto Artículo",
    content: "Contenido del quinto artículo.",
    image: "articulo1.jpg",
  },
];

const seedArticles = async () => {
  try {
    console.log("Ejecutando seeder de artículos...");

    const user = await User.findOne({ where: { email: "User@user.com" } });

    await Article.bulkCreate(articles.map((article) => ({ ...article, UserId: user.id })));

    console.log("Artículos creados con éxito");
  } catch (error) {
    console.error("Error al crear artículos:", error);
  }
};

module.exports = seedArticles();
