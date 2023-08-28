const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// Rutas relacionadas a los comentarios:

router.get("/comment", commentsController.index);
router.get("/comment/:id", commentsController.show);
router.get("/comment/list/:categoryid", commentsController.getCommentsByArticle);
router.post("/comment", commentsController.store);
//router.patch("/comment/:id", commentsController.update);
router.delete("/comment/:id", commentsController.destroy);

module.exports = router;
