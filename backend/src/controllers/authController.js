const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/email');
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const signup = async (req, res) => {
    const { name, email, password, role = "STUDENT", organizationUnitId, gradeId } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (role === "STUDENT" && (!organizationUnitId || !gradeId)) {
            return res.status(400).json({ error: "Organization unit and grade are required for students" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered" });
        }

        if (organizationUnitId) {
            const orgUnit = await prisma.organizationUnit.findUnique({
                where: { id: organizationUnitId }
            });
            if (!orgUnit) {
                return res.status(400).json({ error: "Invalid organization unit" });
            }
        }

        if (gradeId) {
            const grade = await prisma.grade.findUnique({
                where: { id: gradeId }
            });
            if (!grade) {
                return res.status(400).json({ error: "Invalid grade" });
            }
        }

        const hashed = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashed,
                role,
                organizationUnitId: organizationUnitId || null,
                gradeId: gradeId || null,
                verificationToken,
            },
        });

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({ message: "User created successfully. Please check your email to verify your account.", user: user.email });
    } catch (err) {
        res.status(500).json({ error: "Signup failed", detail: err.message });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await prisma.user.findFirst({ where: { verificationToken: token } });
        if (!user) return res.status(400).json({ message: 'Invalid verification token.' });

        await prisma.user.update({
            where: { id: user.id },
            data: { verified: true, verificationToken: null },
        });

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        await prisma.user.update({
            where: { email },
            data: { resetToken, resetTokenExpiry },
        });

        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() }
            },
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired reset token.' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        res.status(200).json({ message: 'Password has been reset.' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
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

        if (user.role === 'STUDENT' && !user.verified) {
            return res.status(403).json({ error: "Please verify your email address before logging in. Check your inbox for a verification link." });
        }

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


module.exports = { signup, verifyEmail, forgotPassword, resetPassword, login, getSignupOptions };