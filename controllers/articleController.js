const { Article, User } = require("../models");
const formidable = require("formidable");
// FALTA HACER LA PARTE DE FORMIDABLE EN CREAR Y EDITAR ARTÍCULO

// Display a listing of the resource.
async function index(req, res) {
  try {
    const articles = await Article.findAll({
      include: User,
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Display the specified resource.
async function show(req, res) {
  const articleId = req.params.id;
  try {
    const article = await Article.findByPk(articleId, {
      include: User,
    });
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { title, content, image, UserId } = req.body;
  try {
    const newArticle = await Article.create({ title, content, image, UserId });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  const articleId = req.params.id;
  const { title, content, image, UserId } = req.body;
  try {
    const article = await Article.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    await article.update({ title, content, image, UserId });
    res.json({ message: "Article updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const articleId = req.params.id;
  try {
    const article = await Article.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    await article.destroy();
    res.json({ message: "Article deleted successfully" });
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
};
