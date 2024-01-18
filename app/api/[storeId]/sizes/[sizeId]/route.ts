import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET SINGLE SIZE
export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) return new NextResponse("SizeId is required");

    const size = await prismadb.size.findUnique({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZEID_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// UPDATE SIZE
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    const { name, value } = await req.json();
    if (!name) return new NextResponse("Label is required", { status: 400 });
    if (!value)
      return new NextResponse("ImageUrl is required", { status: 400 });

    if (!params.storeId) return new NextResponse("StoreId is required");
    if (!params.sizeId) return new NextResponse("SizeId is required");

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const size = await prismadb.size.updateMany({
      where: { id: params.sizeId },
      data: { name, value },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZEID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE SIZE
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    if (!params.storeId) return new NextResponse("StoreId is required");
    if (!params.sizeId) return new NextResponse("SizeId is required");

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const size = await prismadb.size.deleteMany({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZEID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
