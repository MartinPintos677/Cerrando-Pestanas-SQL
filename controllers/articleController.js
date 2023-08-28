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
  //const { title, content, image, UserId } = req.body;
  try {
    const form = formidable({
      multiples: false,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    const userId = req.user.id;

    /*const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }*/

    form.parse(req, async (err, fields, files) => {
      const articleCreate = {
        title: fields.title,
        content: fields.content,
        image: files.image.newFilename,
        UserId: userId,
      };

      const article = await Article.create(articleCreate);
      res.status(201).json(article);
    });
  } catch (error) {
    res.status(500).json({ error: "Bad request" });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const form = formidable({
      multiples: false,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    const userId = req.user.id;

    form.parse(req, async (err, fields, files) => {
      const { id } = req.params;
      const articleUpdate = {
        title: fields.title,
        content: fields.content,
        UserId: userId,
      };

      if (files.image) {
        articleUpdate.image = files.image.newFilename;
      }

      const article = await Article.findByPk(id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }

      await article.update(articleUpdate);
      return res.status(200).json(article);
    });
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
