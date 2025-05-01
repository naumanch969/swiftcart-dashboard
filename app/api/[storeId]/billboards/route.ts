import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// CREATE BILLBOARD
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { label, imageUrl } = await req.json();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!label) return new NextResponse("Name is required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("ImageUrl is required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const store = await prisma.store.findFirst({
      where: { userId, id: params.storeId },
    });

    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const billboard = await prisma.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// GET ALL BILLBOARDS OF A STORE
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const billboard = await prisma.billboard.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
