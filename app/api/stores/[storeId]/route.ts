import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// UPDATE STORE
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    const { name } = await req.json();
    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!params.storeId) return new NextResponse("StoreId is required");

    const store = await prismadb.store.updateMany({
      where: { id: params.storeId, userId },
      data: { name },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE STORE
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    if (!params.storeId) return new NextResponse("StoreId is required");

    const store = await prismadb.store.deleteMany({
      where: { id: params.storeId, userId },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
