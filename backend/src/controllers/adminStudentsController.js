const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

// List students, paginated
exports.listStudents = async (req, res) => {
  try {
    const { skip = 0, take = 20 } = req.query;
    const where = { role: 'STUDENT' };
    const totalCount = await prisma.user.count({ where });
    const students = await prisma.user.findMany({
      where,
      skip: Number(skip),
      take: Number(take),
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    res.json({ students, totalCount });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const student = await prisma.user.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        email: true,
        assignments: { include: { course: true } },
        watchLogs: true,
        quizAttempts: true,
      },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Failed to fetch student' });
  }
};
