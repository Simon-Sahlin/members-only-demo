const { Router } = require("express");
const router = Router();

const db = require("../db/database")

router.get("/", async (req, res) => {
    const msgs = await db.getAllMessages();
    res.render("index", {msgs});
});


module.exports = router;