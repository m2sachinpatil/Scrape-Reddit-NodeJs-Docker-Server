var sqlHealper = require('../Repositories/SqlLiteHealper')
var service = require('../Service/service')
var express = require('express');
const { response } = require('express');
var router = express.Router();

/// get single post data by id
router.get("/post/:id", async (req, res, next) => {
    try {
        var result = await sqlHealper.GetPost(req.params.id)
        return res.json(result);
    }
    catch (err) {
        return res.json(err);
    }
});

//Get all post
router.get("/posts", async (req, res, next) => {
    try {
        var result = await sqlHealper.GetPosts();
        return res.json(result);
    }
    catch (err) {
        return res.json(err);
    }
});

// Insett new post
// TODO : Need to add duplicate check but no specific requiremnt and no unique value so not mentioned.
router.post("/posts", async (req, res, next) => {
    try {
        var postModel = await service.scrapeReddit();
        if (postModel != undefined) {
            await sqlHealper.insertPost(postModel);
            res.json("success")
        }
    }
    catch (err) {
        return res.json(err);
    }
});

module.exports = router;

