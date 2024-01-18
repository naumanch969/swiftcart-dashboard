import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET SINGLE PRODUCT
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) return new NextResponse("ProductId is required");

    const product = await prismadb.product.findUnique({
      where: { id: params.productId },
      include: { images: true, category: true, size: true, color: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTID_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// UPDATE PRODUCT
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = await req.json();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!price) return new NextResponse("Price is required", { status: 400 });
    if (!images || !images.length)
      return new NextResponse("Images is required", { status: 400 });
    if (!categoryId)
      return new NextResponse("CategoryId is required", { status: 400 });
    if (!sizeId) return new NextResponse("SizeId is required", { status: 400 });
    if (!colorId)
      return new NextResponse("ColorId is required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });
    if (!params.productId) return new NextResponse("ProductId is required");

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    await prismadb.product.update({
      where: { id: params.productId },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE PRODUCT
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthonticated", { status: 401 });

    if (!params.storeId) return new NextResponse("StoreId is required");
    if (!params.productId) return new NextResponse("ProductId is required");

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const product = await prismadb.product.deleteMany({
      where: { id: params.productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
