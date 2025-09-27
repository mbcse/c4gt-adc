const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

// Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category' });
  }
};

exports.listCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// Language
exports.createLanguage = async (req, res) => {
  try {
    const { name } = req.body;
    const language = await prisma.language.create({ data: { name } });
    res.status(201).json(language);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create language' });
  }
};

exports.listLanguages = async (req, res) => {
  try {
    const languages = await prisma.language.findMany({ orderBy: { name: 'asc' } });
    res.json(languages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch languages' });
  }
};

exports.createSkillLevel = async (req, res) => {
  try {
    const { level } = req.body;
    if (!level) return res.status(400).json({ message: 'Level is required' });
    const skillLevel = await prisma.skillLevel.create({ data: { level } });
    res.status(201).json(skillLevel);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create skill level' });
  }
};

exports.listSkillLevels = async (req, res) => {
  try {
    const skillLevels = await prisma.skillLevel.findMany({ orderBy: { level: 'asc' } });
    res.json(skillLevels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch skill levels' });
  }
};

// Grade
exports.createGrade = async (req, res) => {
  try {
    const { value } = req.body;
    if (!value) return res.status(400).json({ message: 'Value is required' });
    const grade = await prisma.grade.create({ data: { value } });
    res.status(201).json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create grade' });
  }
};

exports.listGrades = async (req, res) => {
  try {
    const grades = await prisma.grade.findMany({ orderBy: { value: 'asc' } });
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch grades' });
  }
};

// Tag
exports.createTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Tag name is required' });
    const tag = await prisma.tag.create({ data: { name } });
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create tag' });
  }
};

exports.listTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tags' });
  }
};