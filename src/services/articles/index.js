const express = require("express");

const ArticlesSchema = require("./schema");

const ArticlesRouter = express.Router();

ArticlesRouter.get("/", async (req, res, next) => {
  try {
    const articles = await ArticlesSchema.find();
    res.send(articles);
  } catch (error) {
    next(error);
  }
});

ArticlesRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const article = await ArticlesSchema.findById(id);
    if (article) {
      res.send(article);
    } else {
      const error = new Error();
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next("While reading users list a problem occurred!");
  }
});

ArticlesRouter.post("/", async (req, res, next) => {
  try {
    const newArticle = new ArticlesSchema(req.body);
    const { _id } = await newArticle.save();

    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

ArticlesRouter.put("/:id", async (req, res, next) => {
  try {
    const article = await ArticlesSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (article) {
      res.send(article);
    } else {
      const error = new Error(`Article with id:${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

ArticlesRouter.delete("/:id", async (req, res, next) => {
  try {
    const article = await ArticlesSchema.findByIdAndDelete(req.params.id);
    if (article) {
      res.send("Deleted");
    } else {
      const error = new Error(`Article with id:${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = ArticlesRouter;
