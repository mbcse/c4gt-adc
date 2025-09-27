const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const signup = async (req, res) => {
    const { name, email, password, role = "STUDENT", organizationUnitId, gradeId } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // For students, require organizationUnitId and gradeId
        if (role === "STUDENT" && (!organizationUnitId || !gradeId)) {
            return res.status(400).json({ error: "Organization unit and grade are required for students" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered" });
        }

        // Validate organization unit exists
        if (organizationUnitId) {
            const orgUnit = await prisma.organizationUnit.findUnique({
                where: { id: organizationUnitId }
            });
            if (!orgUnit) {
                return res.status(400).json({ error: "Invalid organization unit" });
            }
        }

        // Validate grade exists
        if (gradeId) {
            const grade = await prisma.grade.findUnique({
                where: { id: gradeId }
            });
            if (!grade) {
                return res.status(400).json({ error: "Invalid grade" });
            }
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashed,
                role,
                organizationUnitId: organizationUnitId || null,
                gradeId: gradeId || null
            },
        });

        res.status(201).json({ message: "User created successfully", user: user.email });
    } catch (err) {
        res.status(500).json({ error: "Signup failed", detail: err.message });
    }
};

const getSignupOptions = async (req, res) => {
    try {
        const [blocks, schools, grades] = await Promise.all([
            prisma.organizationUnit.findMany({
                where: { type: 'BLOCK' },
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.organizationUnit.findMany({
                where: { type: 'SCHOOL' },
                select: { id: true, name: true, parentId: true },
                orderBy: { name: 'asc' }
            }),
            prisma.grade.findMany({
                select: { id: true, value: true },
                orderBy: { value: 'asc' }
            })
        ]);

        res.json({
            blocks,
            schools: schools.map(school => ({
                id: school.id,
                name: school.name,
                blockId: school.parentId
            })),
            grades
        });
    } catch (error) {
        console.error('Error fetching signup options:', error);
        res.status(500).json({ error: 'Failed to fetch signup options' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Missing email or password" });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                organizationUnit: {
                    select: { id: true, name: true, type: true, parentId: true }
                },
                grade: {
                    select: { id: true, value: true }
                }
            }
        });

        if (!user)
            return res.status(401).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
                organizationUnitId: user.organizationUnitId
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                organizationUnitId: user.organizationUnitId,
                organizationUnit: user.organizationUnit,
                gradeId: user.gradeId,
                grade: user.grade
            },
        });
    } catch (err) {
        res.status(500).json({ error: "Login failed", detail: err.message });
    }
};


module.exports = { signup, login, getSignupOptions };