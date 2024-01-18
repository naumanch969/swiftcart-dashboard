import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET SINGLE CATEGORY
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) return new NextResponse("CategoryId is required");

    const category = await prismadb.category.findUnique({
      where: { id: params.categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORYID_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// UPDATE CATEGORY
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    const { name, billboardId } = await req.json();
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("BillboardId is required", { status: 400 });

    if (!params.storeId) return new NextResponse("StoreId is required");
    if (!params.categoryId) return new NextResponse("CategoryId is required");

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const category = await prismadb.category.updateMany({
      where: { id: params.categoryId },
      data: { name, billboardId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORYID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE CATEGORY
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    if (!params.storeId) return new NextResponse("StoreId is required");
    if (!params.categoryId) return new NextResponse("CategoryId is required");

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const category = await prismadb.category.deleteMany({
      where: { id: params.categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORYID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
