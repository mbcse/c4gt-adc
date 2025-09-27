const { PrismaClient } = require("../../generated/prisma");
const { buildUserFilter } = require('../utils/filterUtils'); 
const prisma = new PrismaClient();

// List students with filtering, pagination, and role-based access
exports.listStudents = async (req, res) => {
  try {
    const { 
      skip = 0, 
      take = 20, 
      search, 
      blockId, 
      schoolId, 
      gradeId 
    } = req.query;

    const filters = {
      ...(blockId && { blockId }),
      ...(schoolId && { schoolId }),
      ...(gradeId && { gradeId })
    };

    const userFilter = await buildUserFilter(filters, req.user);

    if (search) {
      userFilter.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [students, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: userFilter,
        skip: parseInt(skip),
        take: parseInt(take),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          grade: {               
            select: { value: true }
          },
          organizationUnit: {    
            select: {
              name: true,
              type: true
            }
          }
        },
      }),
      prisma.user.count({ where: userFilter })
    ]);

    res.json({ students, totalCount });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    
    const filters = { studentId };
    const userFilter = await buildUserFilter(filters, req.user);
    
    const student = await prisma.user.findFirst({
      where: {
        id: studentId,
        ...userFilter 
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        grade: {
          select: { id: true, value: true }
        },
        organizationUnit: {
          select: {
            id: true,
            name: true,
            type: true,
            parentId: true
          }
        },
        assignments: { 
          include: { 
            course: {
              select: { id: true, title: true, description: true }
            }
          } 
        },
        watchLogs: {
          select: {
            id: true,
            totalWatchTime: true,
            isCompleted: true,
            updatedAt: true,
            video: {
              select: { title: true }
            }
          },
          orderBy: { updatedAt: 'desc' },
          take: 10 // Limit recent activity
        },
        quizAttempts: {
          select: {
            id: true,
            score: true,
            completedAt: true,
            quiz: {
              select: {
                video: {
                  select: { title: true }
                }
              }
            }
          },
          orderBy: { completedAt: 'desc' },
          take: 10 // Limit recent attempts
        },
      },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found or access denied' });
    }
    
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Failed to fetch student' });
  }
};
