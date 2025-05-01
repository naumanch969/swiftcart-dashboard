import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NEXT_ENV != "production") globalThis.prisma = prisma; // to prevent hot reloading which nextjs does support

export default prisma