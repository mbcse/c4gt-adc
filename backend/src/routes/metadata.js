const express = require('express');
const router = express.Router();
const metadataController = require('../controllers/metadataController');

router.get('/categories', metadataController.listCategories);
router.get('/tags', metadataController.listTags);
router.get('/skill-levels', metadataController.listSkillLevels);
router.get('/grades', metadataController.listGrades);
router.get('/languages', metadataController.listLanguages);

module.exports = router;
