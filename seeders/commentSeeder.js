const { Comment, Article } = require("../models");

const commentsData = [
  {
    name: "Fulano",
    comment: "Esto es un comentario.",
  },
  {
    name: "Fulano",
    comment: "Esto es un comentario.",
  },
  {
    name: "Fulano",
    comment: "Esto es un comentario.",
  },
  {
    name: "Fulano",
    comment: "Esto es un comentario.",
  },
  {
    name: "Fulano",
    comment: "Esto es un comentario.",
  },
];

const seedComments = async () => {
  try {
    console.log("Ejecutando seeder de comentarios...");

    const article = await Article.findOne({ where: { title: "Título Primer Artículo" } });

    await Comment.bulkCreate(
      commentsData.map((comment) => ({ ...comment, ArticleId: article.id })),
    );

    console.log("Comentarios creados con éxito");
  } catch (error) {
    console.error("Error al crear comentarios:", error);
  }
};

module.exports = seedComments();
