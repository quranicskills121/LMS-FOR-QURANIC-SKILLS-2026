import { PrismaClient, UserRole, LessonType, InvoiceStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting LMS database seed...");

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("Password123!", salt);

  // 1. Super Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@academy.com" },
    update: {},
    create: {
      email: "admin@academy.com",
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      firstName: "Global",
      lastName: "Director",
      phone: "+1234567890",
    },
  });

  // 2. Official Faculty Roster (11 Teachers: 8 Male, 3 Female)
  const officialFaculty = [
    // Male Teachers
    { id: "QSK-EMP-001", firstName: "Muallim Mufti Junaid", lastName: "Shams", email: "junaid.shams@quranicskills.com", gender: "Male", spec: ["Advanced Tajweed", "Qira'at", "Fiqh"] },
    { id: "QSK-EMP-002", firstName: "Muallim Aryan", lastName: "Jahangir", email: "aryan.jahangir@quranicskills.com", gender: "Male", spec: ["Hifz Ul Quran", "Nazra Revision"] },
    { id: "QSK-EMP-003", firstName: "Muallim Maulana Sami", lastName: "Ullah", email: "sami.ullah@quranicskills.com", gender: "Male", spec: ["Tajweed Rules", "Islamic Studies"] },
    { id: "QSK-EMP-004", firstName: "Muallim Muhammad", lastName: "Ibrar", email: "muhammad.ibrar@quranicskills.com", gender: "Male", spec: ["Noorani Qaida", "Nazra Recitation"] },
    { id: "QSK-EMP-005", firstName: "Muallim Maulana Inzimam", lastName: "ul Haq", email: "inzimam.ulhaq@quranicskills.com", gender: "Male", spec: ["Hifz Ul Quran", "Manzil Review"] },
    { id: "QSK-EMP-006", firstName: "Muallim", lastName: "Salim", email: "salim@quranicskills.com", gender: "Male", spec: ["Noorani Qaida", "Beginner Makharij"] },
    { id: "QSK-EMP-007", firstName: "Muallim Maulana Majid", lastName: "Ur Rehman", email: "majid.rehman@quranicskills.com", gender: "Male", spec: ["Advanced Tajweed", "Ten Qira'at"] },
    { id: "QSK-EMP-008", firstName: "Muallim Maulana Muhammad", lastName: "Afaq Ajmal", email: "afaq.ajmal@quranicskills.com", gender: "Male", spec: ["Quranic Arabic", "Tafseer", "Grammar"] },
    // Female Teachers
    { id: "QSK-EMP-009", firstName: "Mualima Zainab", lastName: "Riaz", email: "zainab.riaz@quranicskills.com", gender: "Female", spec: ["Female Tajweed", "Youth Hifz"] },
    { id: "QSK-EMP-010", firstName: "Mualima Sumayyah", lastName: "Riaz", email: "sumayyah.riaz@quranicskills.com", gender: "Female", spec: ["Girls Nazra", "Duas & Sunnah"] },
    { id: "QSK-EMP-011", firstName: "Mualima Faiza", lastName: "Riaz", email: "faiza.riaz@quranicskills.com", gender: "Female", spec: ["Noorani Qaida", "Kids Specialist"] },
  ];

  const seededTeachers = [];
  for (const t of officialFaculty) {
    const teacherUser = await prisma.user.upsert({
      where: { email: t.email },
      update: {},
      create: {
        email: t.email,
        passwordHash,
        role: UserRole.TEACHER,
        firstName: t.firstName,
        lastName: t.lastName,
        teacherProfile: {
          create: {
            qualification: "Certified Quran & Tajweed Instructor",
            bio: `${t.firstName} ${t.lastName} - Official Faculty Member at Quranic Skills Academy.`,
            hourlyRate: 35.0,
            specialization: t.spec,
          },
        },
      },
    });
    seededTeachers.push(teacherUser);
  }
  const teacher = seededTeachers[0];

  // 3. Supervisor
  const supervisor = await prisma.user.upsert({
    where: { email: "supervisor@academy.com" },
    update: {},
    create: {
      email: "supervisor@academy.com",
      passwordHash,
      role: UserRole.SUPERVISOR,
      firstName: "Ustadha",
      lastName: "Fatima",
      phone: "+1234567892",
    },
  });

  // 4. Student
  const student = await prisma.user.upsert({
    where: { email: "student@academy.com" },
    update: {},
    create: {
      email: "student@academy.com",
      passwordHash,
      role: UserRole.STUDENT,
      firstName: "Zayd",
      lastName: "Ali",
      phone: "+1234567893",
      studentProfile: {
        create: {
          studentIdCode: "QS-2026-001",
          guardianName: "Muhammad Ali",
          guardianPhone: "+1234567894",
          guardianEmail: "parent.ali@example.com",
          preferredCurrency: "USD",
        },
      },
    },
  });

  console.log("✅ Users seeded: Super Admin, Teacher, Supervisor, Student");

  // 5. Course & Curriculum
  const course = await prisma.course.upsert({
    where: { slug: "quranic-tajweed-essentials" },
    update: {},
    create: {
      title: "Quranic Tajweed Essentials",
      slug: "quranic-tajweed-essentials",
      courseCode: "TAJ-101",
      description: "Master the rules of articulation, pronunciation, and melodic Quranic recitation.",
      level: "Beginner",
      isPublished: true,
      createdById: admin.id,
      modules: {
        create: [
          {
            title: "Module 1: Makharij al-Huruf (Points of Articulation)",
            orderIndex: 1,
            lessons: {
              create: [
                {
                  title: "Lesson 1: Introduction to Throat & Tongue Letters",
                  contentType: LessonType.VIDEO,
                  mediaDurationSeconds: 1800,
                  orderIndex: 1,
                  isPreview: true,
                },
                {
                  title: "Lesson 2: Reference Worksheets & Pronunciation Guide",
                  contentType: LessonType.PDF,
                  fileSizeBytes: BigInt(2540000),
                  orderIndex: 2,
                },
              ],
            },
          },
        ],
      },
      feePlans: {
        create: [
          {
            title: "Standard Monthly Subscription",
            currency: "USD",
            amount: 50.0,
            billingInterval: "monthly",
          },
        ],
      },
    },
    include: {
      feePlans: true,
    },
  });

  console.log(`✅ Course seeded: ${course.title}`);

  // 6. Cohort Batch
  const batch = await prisma.batch.create({
    data: {
      name: "Tajweed Cohort - Morning Batch A",
      courseId: course.id,
      teacherId: teacher.id,
      supervisorId: supervisor.id,
      classDays: ["Monday", "Wednesday", "Friday"],
      startTime: "10:00",
      endTime: "11:00",
      meetingLink: "https://meet.google.com/xyz-quran-class",
      enrollments: {
        create: {
          studentId: student.id,
          status: "active",
        },
      },
    },
  });

  console.log(`✅ Batch seeded: ${batch.name}`);

  // 7. Student Fee Assignment & Sample Invoice
  const feePlan = course.feePlans[0];
  if (feePlan) {
    await prisma.studentFeeAssignment.create({
      data: {
        studentId: student.id,
        batchId: batch.id,
        feePlanId: feePlan.id,
        customDiscountPercentage: 0.0,
      },
    });

    await prisma.invoice.create({
      data: {
        invoiceNumber: "INV-2026-1001",
        studentId: student.id,
        batchId: batch.id,
        billingMonth: new Date("2026-10-01"),
        currency: "USD",
        baseAmount: 50.0,
        discountAmount: 0.0,
        totalDue: 50.0,
        totalPaid: 0.0,
        dueDate: new Date("2026-10-10"),
        status: InvoiceStatus.UNPAID,
      },
    });

    console.log("✅ Sample Fee Invoice generated for student");
  }

  console.log("\n🎉 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
