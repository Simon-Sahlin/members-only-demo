const { Router } = require("express");
const router = Router();

const { check, validationResult } = require("express-validator");
const db = require("../db/database")

/* ---------------------------------- Index --------------------------------- */

router.get("/", async (req, res) => {
    const msgs = await db.getAllMessagesWithAuthors();
    res.render("index", {msgs, user: req.user});
});

/* ------------------------------------ C ----------------------------------- */

router.get("/newMessage", (req, res) => {
    res.render("messageForm", {values: {title:"", content:""}, user: req.user});
});

const validateMessage = [
    check("title").trim()
        .notEmpty().withMessage("Title can not empty"),
    check("content").trim()
        .notEmpty().withMessage("Content can not empty")
]

router.post("/newMessage", [validateMessage, async (req, res) => {
    const { title, content, membership } = req.body;

    isPremiumMember = membership != undefined ? true : false;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).render("messageForm", {values: {title, content, isPremiumMember}, errors: errors.array(), user: req.user});
    }

    await db.createMessage(req.user.id, title, content, isPremiumMember);
    res.redirect("/");
}]);

/* ------------------------------------ D ----------------------------------- */

router.post("/deleteMessage", async (req, res) => {
    const { postId } = req.body;

    await db.deleteMessage(postId);

    res.redirect("/");
});

/* ------------------------------------ - ----------------------------------- */

module.exports = router;