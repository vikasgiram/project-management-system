const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController');
const {permissionMiddleware, } = require("../middlewares/auth");
const upload = require('../middlewares/fileUpload');

router.get('/', permissionMiddleware(['viewProject']), projectController.showAll);

router.get('/my', permissionMiddleware(['viewProject']), projectController.myProjects);


router.get('/search',permissionMiddleware(['viewProject']), projectController.search);

router.get('/export-pdf', projectController.exportProjects);

router.post('/', permissionMiddleware(['createProject']),upload.single('image') ,projectController.create);

router.get('/:id', permissionMiddleware(['viewProject']), projectController.getProject);

router.put('/:id', permissionMiddleware(['updateProject']), projectController.updateProject);

router.delete('/:id', permissionMiddleware(['deleteProject']), projectController.delete);


module.exports = router;