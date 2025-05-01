import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// CREATE SIZE
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value)
      return new NextResponse("Value is required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const store = await prisma.store.findFirst({
      where: { userId, id: params.storeId },
    });

    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const size = await prisma.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.error("[SIZES_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// GET ALL SIZES OF A STORE
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const size = await prisma.size.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.error("[SIZES_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
