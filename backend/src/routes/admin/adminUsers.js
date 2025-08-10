const express = require('express');
const { PrismaClient } = require("../../../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();
const bcrypt = require('bcrypt');
const requireAuth = require('../../middlewares/requireAuth');
const requireRole = require('../../middlewares/requireRole');

// GET /users - Fetch users filtered by role, with pagination, optional search,
// and computed enrolledCourses, progress, lastActive
router.get('/', requireAuth, requireRole(['ADMIN', 'SUPERADMIN']), async (req, res) => {
  try {
    const { role, skip = 0, take = 20, search } = req.query;

    const where = {};
    if (role) where.role = role.toString().toUpperCase();

    if (search) {
      where.OR = [
        { name: { contains: search.toString(), mode: 'insensitive' } },
        { email: { contains: search.toString(), mode: 'insensitive' } },
      ];
    }

    // Fetch users with basic info, assignment count, latest watch log, latest quiz attempts
    const users = await prisma.user.findMany({
      where,
      skip: Number(skip),
      take: Math.min(Number(take), 100),
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { assignments: true } // enrolledCourses count
        },
        watchLogs: {
          select: { updatedAt: true },
          orderBy: { updatedAt: 'desc' },
          take: 1
        },
        quizAttempts: {
          select: { score: true },
          orderBy: { completedAt: 'desc' },
          take: 1
        }
      },
    });

    const totalCount = await prisma.user.count({ where });

    // Transform to include computed fields
    const enhancedUsers = users.map(user => {
      const enrolledCourses = user._count.assignments || 0;

      // Example progress metric: latest quiz score rounded.
      const progress = user.quizAttempts.length > 0
        ? Math.round(user.quizAttempts[0].score)
        : 0;

      // Last active: prefer watchLog date, else createdAt
      const lastActive = user.watchLogs.length > 0
        ? user.watchLogs[0].updatedAt
        : user.createdAt;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        enrolledCourses,
        progress,
        lastActive
      };
    });

    res.json({ users: enhancedUsers, totalCount });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// POST /users - Create a new user (admin or instructor), restricted
router.post('/users', requireAuth, requireRole(['SUPERADMIN']), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// PUT /users/:id/role - Update user role, restricted
router.put('/:id/role', requireAuth, requireRole(['SUPERADMIN']), async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { role } = req.body;

    if (!role || !['SUPERADMIN', 'ADMIN', 'INSTRUCTOR', 'STUDENT'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
});

module.exports = router;
