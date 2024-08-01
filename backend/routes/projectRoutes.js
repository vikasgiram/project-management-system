const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController');
const { isLoggedIn, isSales } = require("../middlewares/auth");

router.get('/', isLoggedIn, projectController.showAll);

router.post('/',isSales, projectController.create);

router.put('/:id',isSales, projectController.update);


module.exports = router;