import prisma from "@/lib/prisma"

export const getSalesCount = async (storeId: string) => {
    const salesCount = await prisma.order.count({
        where: { storeId, isPaid: true },
    })

    return salesCount
}

