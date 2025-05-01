import prisma from "@/lib/prisma"

export const getTotalRevenure = async (storeId: string) => {
    const paidOrders = await prisma.order.findMany({
        where: { storeId, isPaid: true },
        include: {
            orderItems: {
                include: { product: true }
            }
        },
    })

    const totalRevenue = paidOrders.reduce((total: number, order: any) => {
        const orderTotal = order.orderItems.reduce((orderSum: number, item: any) => { return orderSum + Number(item.product.price) }, 0)
        return total + orderTotal
    }, 0)

    return totalRevenue
}