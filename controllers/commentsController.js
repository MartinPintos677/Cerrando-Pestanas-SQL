const { Comment, Article } = require("./models");

async function index(req, res) {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios." });
  }
}

async function show(req, res) {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findByPk(commentId);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: "Comentario no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el comentario." });
  }
}

async function store(req, res) {
  const { name, comment, articleId } = req.body;
  try {
    const newComment = await Comment.create({ name, comment, ArticleId: articleId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el comentario." });
  }
}

/*async update(req, res) {
    const commentId = req.params.id;
    const { name, comment } = req.body;
    try {
      const commentToUpdate = await Comment.findByPk(commentId);
      if (commentToUpdate) {
        commentToUpdate.name = name;
        commentToUpdate.comment = comment;
        await commentToUpdate.save();
        res.json(commentToUpdate);
      } else {
        res.status(404).json({ error: "Comentario no encontrado." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el comentario." });
    }
  },*/

async function destroy(req, res) {
  const commentId = req.params.id;
  try {
    const commentToDelete = await Comment.findByPk(commentId);
    if (commentToDelete) {
      await commentToDelete.destroy();
      res.json({ message: "Comentario eliminado exitosamente." });
    } else {
      res.status(404).json({ error: "Comentario no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el comentario." });
  }
}

async function getCommentsByArticle(req, res) {
  const articleId = req.params.articleId;
  try {
    const article = await Article.findByPk(articleId, {
      include: { model: Comment },
    });
    if (article) {
      res.json(article.Comments);
    } else {
      res.status(404).json({ error: "Artículo no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios del artículo." });
  }
}

// Exportar los métodos del controlador.
module.exports = {
  index,
  show,
  store,
  destroy,
  getCommentsByArticle,
};
