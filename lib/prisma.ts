import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV != "production") globalThis.prisma = prismadb; // to prevent hot reloading which nextjs does support

export default prismadb;
