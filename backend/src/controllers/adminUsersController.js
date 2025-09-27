const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.listUsers = async (req, res) => {
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
        _count: { select: { assignments: true } }
      },
    });

    const totalCount = await prisma.user.count({ where });

    const enhancedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      enrolledCourses: user._count.assignments || 0,
    }));

    res.json({ users: enhancedUsers, totalCount });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.createUser = async (req, res) => {
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
      data: { name, email, password: hashedPassword, role: role.toUpperCase() },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { role } = req.body;
    const allowedRoles = ['SUPERADMIN', 'ADMIN', 'INSTRUCTOR', 'STUDENT'];

    if (!role || !allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: role.toUpperCase() },
      select: { id: true, name: true, email: true, role: true }
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await prisma.user.delete({ where: { id: userId } });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
