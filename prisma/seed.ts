import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const schools = ['Yaba college of Technology', 'University of Lagos'];
const department = [
  'Computer science',
  'Computer Engineering',
  'Electrical engineering',
];
export const seedDB = async () => {
  try {
    schools.forEach(async (school) => {
      await prisma.school.create({
        data: {
          schoolName: school.toLowerCase(),
        },
      });
    });
    department.forEach(async (dept) => {
      await prisma.department.create({
        data: {
          DepartmentName: dept.toLowerCase(),
        },
      });
    });
  } catch (err: any) {
    console.log(err);
  }
};

seedDB()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
