import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// CREATE COLOR
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

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });

    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[COLORS_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// GET ALL COLORS OF A STORE
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const color = await prismadb.color.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[COLORS_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
