const express = require('express');
const router = express.Router();
const requireAuth = require('../../middlewares/requireAuth');
const requireRole = require('../../middlewares/requireRole');
const adminUsersController = require('../../controllers/adminUsersController');

router.get('/', requireAuth, requireRole(['ADMIN', 'SUPERADMIN']), adminUsersController.listUsers);
router.post('/', requireAuth, requireRole(['ADMIN', 'SUPERADMIN']), adminUsersController.createUser);
router.put('/:id/role', requireAuth, requireRole(['SUPERADMIN']), adminUsersController.updateUserRole);
router.delete('/:id', requireAuth, requireRole(['ADMIN', 'SUPERADMIN']), adminUsersController.deleteUser);

module.exports = router;
