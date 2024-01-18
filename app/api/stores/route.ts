import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// CREATE STORE
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORES_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
