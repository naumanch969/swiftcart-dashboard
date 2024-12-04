import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET SINGLE BILLBOARD
export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) return new NextResponse("BillboardId is required");

    const billboard = await prismadb.billboard.findUnique({
      where: { id: params.billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARDID_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// UPDATE BILLBOARD
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    const { label, imageUrl } = await req.json();
    if (!label) return new NextResponse("Label is required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("ImageUrl is required", { status: 400 });

    if (!params.storeId) return new NextResponse("StoreId is required");
    if (!params.billboardId) return new NextResponse("BillboardId is required");

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const billboard = await prismadb.billboard.updateMany({
      where: { id: params.billboardId },
      data: { label, imageUrl },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARDID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE BILLBOARD
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    if (!params.storeId) return new NextResponse("StoreId is required");
    if (!params.billboardId) return new NextResponse("BillboardId is required");

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const billboard = await prismadb.billboard.deleteMany({
      where: { id: params.billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARDID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
