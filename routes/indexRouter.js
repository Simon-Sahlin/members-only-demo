const { Router } = require("express");
const router = Router();

const { check, validationResult } = require("express-validator");
const db = require("../db/database")

/* ---------------------------------- Index --------------------------------- */

router.get("/", async (req, res) => {
    const msgs = await db.getAllMessages();
    res.render("index", {msgs, user: req.user});
});

/* ------------------------------------ C ----------------------------------- */

router.get("/newMessage", (req, res) => {
    res.render("messageForm", {values: {title:"", content:""}});
});

const validateMessage = [
    check("title").trim()
        .notEmpty().withMessage("Title can not empty"),
    check("content").trim()
        .notEmpty().withMessage("Content can not empty")
]

router.post("/newMessage", [validateMessage, async (req, res) => {
    const { title, content } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).render("messageForm", {values: {title, content}, errors: errors.array()});
    }

    await db.createMessage(title, content);
    res.redirect("/");
}]);

/* ------------------------------------ - ----------------------------------- */


module.exports = router;