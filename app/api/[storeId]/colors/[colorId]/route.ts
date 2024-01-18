import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET SINGLE COLOR
export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) return new NextResponse("ColorId is required");

    const color = await prismadb.color.findUnique({
      where: { id: params.colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORID_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// UPDATE COLOR
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    const { name, value } = await req.json();
    if (!name) return new NextResponse("Label is required", { status: 400 });
    if (!value)
      return new NextResponse("ImageUrl is required", { status: 400 });

    if (!params.storeId) return new NextResponse("StoreId is required");
    if (!params.colorId) return new NextResponse("ColorId is required");

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const color = await prismadb.color.updateMany({
      where: { id: params.colorId },
      data: { name, value },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE COLOR
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    if (!params.storeId) return new NextResponse("StoreId is required");
    if (!params.colorId) return new NextResponse("ColorId is required");

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const color = await prismadb.color.deleteMany({
      where: { id: params.colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
