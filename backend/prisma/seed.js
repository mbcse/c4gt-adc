const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  const superAdminEmail = 'superadmin@test.com'; 
  const superAdminPassword = PLACEHOLDER_PASSWORD; 

  const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {}, 
    create: {
      name: 'Super Admin',
      email: superAdminEmail,
      password: hashedPassword,
      role: 'SUPERADMIN',
      verified: true, 
    },
  });

  console.log(`✅ Super admin user created or already exists: ${superAdmin.email}`);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the database connection
    await prisma.$disconnect();
  });