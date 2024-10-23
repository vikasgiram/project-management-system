const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController');
const {permissionMiddleware, } = require("../middlewares/auth");

router.get('/', permissionMiddleware(['viewProject']), projectController.showAll);

router.get('/my', permissionMiddleware(['viewProject']), projectController.myProjects);

router.get('/:id', permissionMiddleware(['viewProject']), projectController.getProject);

router.get('/search',permissionMiddleware(['viewProject']), projectController.search);


router.post('/', permissionMiddleware(['createProject']) ,projectController.create);

router.put('/:id', permissionMiddleware(['updateProject']), projectController.updateProject);

router.delete('/:id', permissionMiddleware(['deleteProject']), projectController.delete);


module.exports = router;