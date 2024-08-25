const express = require("express");
const router = express.Router();


//Import controller
const muaController = require("../controllers/muaController");

//Create Admin Account
router.post("/createAdminAccount", muaController.createAdminAccount);

//Admin Login
router.post("/loginAdmin", muaController.loginAdmin);

//Verify Token
router.get("/verifyToken/:id", muaController.verifyToken);

//Save Services
router.post("/saveServicesList", muaController.saveServicesList);

//Get Services
router.get("/getServicesList", muaController.getServicesList);

//Delete Services
router.delete("/deleteServicesList", muaController.deleteServicesList);

//Save IG Token
router.post("/saveIGToken", muaController.saveIGToken);

//Save IG Photos
router.get("/getIGMedia", muaController.getIGMedia);

router.post("/createInquiry", muaController.createInquiry);

module.exports = router;

