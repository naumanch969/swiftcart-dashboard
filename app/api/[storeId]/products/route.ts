import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// CREATE PRODUCT
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    const store = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });

    if (!store) return new NextResponse("Unauthorized ", { status: 400 });

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          // TO LOOK
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// GET ALL PRODUCTS OF A STORE
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
