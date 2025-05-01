import prisma from "@/lib/prisma"

export const getStockCount = async (storeId: string) => {
    const stockCount = await prisma.product.count({
        where: { storeId, isArchived: false },
    })

    return stockCount
}