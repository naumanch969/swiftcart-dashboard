import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// CREATE CATEGORY
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { name, billboardId } = await req.json();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("BillboardId is required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });

    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORIES_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// GET ALL CATEGORIES OF A STORE
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const categories = await prismadb.category.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORIES_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
