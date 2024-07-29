const express = require("express");
const router = express.Router();
//Import controller
const muaController = require("../controllers/muaController");

// //Admin Login
// router.post("/loginAdmin", muaController.loginUser);

//Save IG Token
router.get("/saveIGToken", muaController.saveIGToken);

//Save IG Photos
router.get("/getIGMedia", muaController.getIGMedia);

module.exports = router;