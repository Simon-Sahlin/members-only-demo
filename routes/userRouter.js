const { Router } = require("express");
const router = Router();

const { check, validationResult } = require("express-validator");
const db = require("../db/database");
const passport = require("passport");
const bcrypt = require("bcryptjs");

/* ------------------------------------ - ----------------------------------- */

router.get("/login", async (req, res) => {
    res.render("login", { values: { username:"", password:"" } });
});

router.post("/login", 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    })
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

/* ------------------------------------ - ----------------------------------- */

const emErr = " can not empty"
const validateSignup = [
    check("fName").trim()
        .notEmpty().withMessage("First name" + emErr),
    check("lName").trim()
        .notEmpty().withMessage("Last name" + emErr),
    check("username").trim()
        .notEmpty().withMessage("Username" + emErr),
    check("password").trim()
        .notEmpty().withMessage("Password" + emErr),
    check("passwordConf").trim()
        .custom((value, {req}) => value === req.body.password).withMessage("Password do not match"),
]

router.get("/signup", (req, res) => {
    res.render("signup", { values: { fName:"", lName:"", username:"", password:"", passwordConf:"", membership:false } });
});

router.post("/signup", [validateSignup, async (req, res) => {
    const { fName, lName, username, password, passwordConf, membership } = req.body;

    isPremiumMember = membership != undefined ? true : false;

    const errors = validationResult(req).array();
    const hm = await db.getUserFromUsername(username)
    if (hm.length > 0) 
        errors.push({msg: "Username taken"})
    if (errors.length > 0){
        return res.status(400).render("signup", {values: { fName, lName, username, password, passwordConf, isPremiumMember }, errors: errors});
    }
    
    await bcrypt.hash(password, 10, async (err, hashedPassword) => {
        await db.createUser(fName, lName, username, hashedPassword, isPremiumMember);
        res.redirect("/login")
    });
}]);

/* ------------------------------------ - ----------------------------------- */

module.exports = router;