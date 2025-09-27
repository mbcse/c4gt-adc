const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const signup = async (req, res) => {
    const { name, email, password, role="STUDENT" } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered" });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashed, role },
        });
        res.status(201).json({ message: "User created", user: user.email });
    } catch (err) {
        res.status(500).json({ error: "Signup failed", detail: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Missing email or password" });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(401).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign(
            { userId: user.id, role: user.role },
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
            },
        });
    } catch (err) {
        res.status(500).json({ error: "Login failed", detail: err.message });
    }
};

module.exports = { signup, login };