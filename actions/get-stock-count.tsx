import prismadb from "@/lib/prisma"

export const getStockCount = async (storeId: string) => {
    const stockCount = await prismadb.product.count({
        where: { storeId, isArchived: false },
    })

    return stockCount
}