const { PrismaClient } = require("../../generated/prisma");
const { buildUserFilter, getOrgUnitDescendants } = require('../utils/filterUtils');
const bcrypt = require('bcrypt');
const { sendNewUserEmail } = require('../utils/email');
const prisma = new PrismaClient();

exports.listUsers = async (req, res) => {
  try {
    const {
      role,
      skip = 0,
      take = 20,
      search
    } = req.query;

    const currentUser = req.user;
    let whereCondition = {};

    // Role-based access control for what users can be viewed
    if (currentUser.role === 'SUPERADMIN') {
      if (role) {
        if (!['SUPERADMIN', 'ADMIN', 'INSTRUCTOR'].includes(role.toUpperCase())) {
          return res.status(403).json({ message: 'Access denied for this role' });
        }
        whereCondition.role = role.toUpperCase();
      } else {
        whereCondition.role = { in: ['SUPERADMIN', 'ADMIN', 'INSTRUCTOR'] };
      }
    } else if (currentUser.role === 'ADMIN') {
      whereCondition.role = 'INSTRUCTOR';

      if (currentUser.organizationUnitId) {
        const descendantIds = await getOrgUnitDescendants(currentUser.organizationUnitId);
        const accessibleOrgIds = [currentUser.organizationUnitId, ...descendantIds];
        whereCondition.organizationUnitId = { in: accessibleOrgIds };
      }

      if (role && role.toUpperCase() !== 'INSTRUCTOR') {
        return res.status(403).json({ message: 'Access denied for this role' });
      }
    } else {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    if (search) {
      whereCondition.OR = [
        { name: { contains: search.toString(), mode: 'insensitive' } },
        { email: { contains: search.toString(), mode: 'insensitive' } },
      ];
    }

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: whereCondition,
        skip: Number(skip),
        take: Math.min(Number(take), 100),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          organizationUnit: {
            select: {
              id: true,
              name: true,
              type: true,
              parentId: true
            }
          },
          grade: {
            select: {
              id: true,
              value: true
            }
          },
          _count: {
            select: {
              assignments: true
            }
          }
        },
      }),
      prisma.user.count({ where: whereCondition })
    ]);

    const enhancedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      organizationUnit: user.organizationUnit,
      grade: user.grade,
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
    const {
      name,
      email,
      password,
      role,
      organizationUnitId,
      gradeId
    } = req.body;

    const currentUser = req.user;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    // Role-based permission validation
    if (currentUser.role === 'SUPERADMIN') {
      if (!['SUPERADMIN', 'ADMIN', 'INSTRUCTOR'].includes(role.toUpperCase())) {
        return res.status(400).json({ message: 'Superadmins can only create SUPERADMIN, ADMIN, and INSTRUCTOR users' });
      }
    } else if (currentUser.role === 'ADMIN') {
      // Admins can only create INSTRUCTOR
      if (role.toUpperCase() !== 'INSTRUCTOR') {
        return res.status(400).json({ message: 'Admins can only create INSTRUCTOR users' });
      }

      // For instructors created by admins, they must be in the admin's organization
      if (!organizationUnitId) {
        return res.status(400).json({ message: 'Organization unit is required for instructors' });
      }

      // Verify the organizationUnitId is within admin's scope
      if (currentUser.organizationUnitId) {
        const descendantIds = await getOrgUnitDescendants(currentUser.organizationUnitId);
        const accessibleOrgIds = [currentUser.organizationUnitId, ...descendantIds];

        if (!accessibleOrgIds.includes(organizationUnitId)) {
          return res.status(400).json({ message: 'Cannot assign user to organization outside your scope' });
        }
      }
    } else {
      return res.status(403).json({ message: 'Insufficient permissions to create users' });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'A user with this email already exists' });
    }

    // Validate organization unit exists if provided
    if (organizationUnitId) {
      const orgUnit = await prisma.organizationUnit.findUnique({
        where: { id: organizationUnitId }
      });

      if (!orgUnit) {
        return res.status(400).json({ message: 'Invalid organization unit' });
      }
    }

    // Validate grade exists if provided
    if (gradeId) {
      const grade = await prisma.grade.findUnique({
        where: { id: gradeId }
      });

      if (!grade) {
        return res.status(400).json({ message: 'Invalid grade' });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role.toUpperCase(),
        organizationUnitId: organizationUnitId || null,
        gradeId: gradeId || null,
        verified: true // New users created by admin are auto-verified
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        organizationUnit: {
          select: {
            id: true,
            name: true,
            type: true,
            parentId: true
          }
        },
        grade: {
          select: {
            id: true,
            value: true
          }
        }
      },
    });

    await sendNewUserEmail(
      newUser.email,
      password,
      newUser.role,
      newUser.organizationUnit?.name
    );

    res.status(201).json({
      user: newUser,
      message: 'User created successfully and an email has been sent.'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { role } = req.body;
    const currentUser = req.user;

    // Get the user to be updated
    const userToUpdate = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        organizationUnitId: true,
        name: true,
        email: true
      }
    });

    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Permission checks
    if (currentUser.role === 'ADMIN') {
      // Admins can only update instructors in their organization
      if (userToUpdate.role !== 'INSTRUCTOR') {
        return res.status(403).json({ message: 'Cannot update this user type' });
      }

      if (currentUser.organizationUnitId) {
        const descendantIds = await getOrgUnitDescendants(currentUser.organizationUnitId);
        const accessibleOrgIds = [currentUser.organizationUnitId, ...descendantIds];

        if (!accessibleOrgIds.includes(userToUpdate.organizationUnitId)) {
          return res.status(403).json({ message: 'Cannot update users outside your organization' });
        }
      }
    }

    const allowedRoles = currentUser.role === 'SUPERADMIN'
      ? ['ADMIN', 'INSTRUCTOR']
      : ['INSTRUCTOR'];

    if (!role || !allowedRoles.includes(role.toUpperCase())) {
      return res.status(400).json({ message: 'Invalid role for your permission level' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: role.toUpperCase() },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        organizationUnit: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      }
    });

    res.json({
      user: updatedUser,
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const currentUser = req.user;

    // Get user to be deleted
    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        organizationUnitId: true,
        name: true,
        email: true
      }
    });

    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Permission checks
    if (currentUser.role === 'ADMIN') {
      // Admins can only delete instructors in their organization
      if (userToDelete.role !== 'INSTRUCTOR') {
        return res.status(403).json({ message: 'Cannot delete this user type' });
      }

      if (currentUser.organizationUnitId) {
        const descendantIds = await getOrgUnitDescendants(currentUser.organizationUnitId);
        const accessibleOrgIds = [currentUser.organizationUnitId, ...descendantIds];

        if (!accessibleOrgIds.includes(userToDelete.organizationUnitId)) {
          return res.status(403).json({ message: 'Cannot delete users outside your organization' });
        }
      }
    } else if (currentUser.role === 'SUPERADMIN') {
      // Superadmins can delete ADMIN and INSTRUCTOR (but not other SUPERADMINs)
      if (userToDelete.role === 'SUPERADMIN') {
        return res.status(403).json({ message: 'Cannot delete superadmin users' });
      }
    }

    // Prevent self-deletion
    if (userId === currentUser.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await prisma.user.delete({
      where: { id: userId }
    });

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

exports.createOrganizationUnit = async (req, res) => {
  try {
    const { name, type, parentId } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: 'Name and type are required' });
    }

    const validTypes = ['STATE', 'DISTRICT', 'BLOCK', 'SCHOOL'];
    if (!validTypes.includes(type.toUpperCase())) {
      return res.status(400).json({ message: 'Invalid organization unit type' });
    }

    if (parentId) {
      const parentUnit = await prisma.organizationUnit.findUnique({
        where: { id: Number(parentId) },
      });
      if (!parentUnit) {
        return res.status(400).json({ message: 'Parent organization unit not found' });
      }
    }

    const newUnit = await prisma.organizationUnit.create({
      data: {
        name: name.trim(),
        type: type.toUpperCase(),
        parentId: parentId ? Number(parentId) : null,
      },
    });

    res.status(201).json(newUnit);
  } catch (error) {
    if (error.code === 'P2002') {
       return res.status(409).json({ message: `An organization unit with the name "${req.body.name}" already exists.` });
    }
    console.error('Error creating organization unit:', error);
    res.status(500).json({ message: 'Failed to create organization unit' });
  }
};
