const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController');
const { isLoggedIn, isSales } = require("../middlewares/auth");

router.get('/project', isLoggedIn, projectController.showAll);

router.post('/project',isSales, projectController.create);

router.put('/project/:id',isSales, projectController.update);


module.exports = router;