const { Comment, Article } = require("../models");

const commentOne = {
  name: "Fulano",
  comment: "Esto es un comentario",
};

const commentTwo = {
  name: "Fulano",
  comment: "Esto es otro comentario",
};

const commentThree = {
  name: "Fulano",
  comment: "Esto es un comentario",
};

const commentFour = {
  name: "Fulano",
  comment: "Esto es otro comentario",
};

const commentFive = {
  name: "Fulano",
  comment: "Esto es un comentario",
};

const commentSix = {
  name: "Fulano",
  comment: "Esto es otro comentario",
};

const commentSeven = {
  name: "Fulano",
  comment: "Esto es un comentario",
};

const commentEight = {
  name: "Fulano",
  comment: "Esto es otro comentario",
};

const commentNine = {
  name: "Fulano",
  comment: "Esto es un comentario",
};

const commentTen = {
  name: "Fulano",
  comment: "Esto es otro comentario",
};

const seedComments = async () => {
  try {
    console.log("Ejecutando seeder de comentarios...");

    const articleOne = await Article.findOne({ where: { title: "Título Primer Artículo" } });

    await Comment.bulkCreate([
      { ...commentOne, ArticleId: articleOne.id },
      { ...commentTwo, ArticleId: articleOne.id },
    ]);

    const articleTwo = await Article.findOne({ where: { title: "Título Segundo Artículo" } });

    await Comment.bulkCreate([
      { ...commentThree, ArticleId: articleTwo.id },
      { ...commentFour, ArticleId: articleTwo.id },
    ]);

    const articleThree = await Article.findOne({ where: { title: "Título Tercer Artículo" } });

    await Comment.bulkCreate([
      { ...commentFive, ArticleId: articleThree.id },
      { ...commentSix, ArticleId: articleThree.id },
    ]);

    const articleFour = await Article.findOne({ where: { title: "Título Cuarto Artículo" } });

    await Comment.bulkCreate([
      { ...commentSeven, ArticleId: articleFour.id },
      { ...commentEight, ArticleId: articleFour.id },
    ]);

    const articleFive = await Article.findOne({ where: { title: "Título Quinto Artículo" } });

    await Comment.bulkCreate([
      { ...commentNine, ArticleId: articleFive.id },
      { ...commentTen, ArticleId: articleFive.id },
    ]);

    console.log("Comentarios creados con éxito");
  } catch (error) {
    console.error("Error al crear comentarios:", error);
  }
};

module.exports = seedComments();
