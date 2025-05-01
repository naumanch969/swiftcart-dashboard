// prisma/seed.js (or seed.ts if using TypeScript)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create some sample data
    await prisma.store.create({
        data: {
            name: "Sample Store",
            userId: "sampleUserId",
        },
    });

    console.log("Database seeded!");
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });
