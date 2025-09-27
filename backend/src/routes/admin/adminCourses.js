const express = require('express');
const router = express.Router();

const adminCourseController = require('../../controllers/adminCourseController');
const adminVideoController = require('../../controllers/adminVideoController');

// Course CRUD and assignments
router.get('/', adminCourseController.listCourses);
router.post('/', adminCourseController.createCourse);
router.put('/:id', adminCourseController.updateCourse);
router.delete('/:id', adminCourseController.deleteCourse);

router.post('/assign', adminCourseController.assignCourse);
router.delete('/assign', adminCourseController.unassignCourse);
router.get('/assignments', adminCourseController.listAssignments);
router.get('/:id', adminCourseController.getCourse);

// Video endpoints
router.post('/:courseId/videos', adminVideoController.addVideoToCourse);
router.delete('/:courseId/videos/:videoId', adminVideoController.deleteVideoFromCourse);
router.post('/process-playlist', adminVideoController.processPlaylist);
router.post('/:courseId/videos/bulk', adminVideoController.addVideosFromPlaylist);
router.put('/:courseId/videos/reorder', adminVideoController.reorderVideos);
router.get('/video-metadata', adminVideoController.getVideoMetadata);
router.get('/playlist/videos', adminVideoController.getPaginatedPlaylistVideos);
router.post('/:courseId/playlist/add-all', adminVideoController.addEntirePlaylist);

module.exports = router;
