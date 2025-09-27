const express = require('express');
const router = express.Router();
const metadataController = require('../../controllers/metadataController');

router.post('/categories', metadataController.createCategory);
router.post('/tags', metadataController.createTag);
router.post('/skill-levels', metadataController.createSkillLevel);
router.post('/grades', metadataController.createGrade);
router.post('/languages', metadataController.createLanguage);

module.exports = router;