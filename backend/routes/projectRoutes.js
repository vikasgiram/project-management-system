const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController');
const { isLoggedIn, permissionMiddleware, isCompany, } = require("../middlewares/auth");

router.get('/', permissionMiddleware(['viewProject']), projectController.showAll);

router.post('/', permissionMiddleware(['createProject']) ,projectController.create);

router.put('/:id', permissionMiddleware(['updateProject']), projectController.update);

router.delete('/:id', isCompany, projectController.delete);


module.exports = router;