import prismadb from "@/lib/prisma"

export const getTotalRevenure = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: { storeId, isPaid: true },
        include: {
            orderItems: {
                include: { product: true }
            }
        },
    })

    const totalRevenue = paidOrders.reduce((total: number, order) => {
        const orderTotal = order.orderItems.reduce((orderSum: number, item) => { return orderSum + item.product.price.toNumber() }, 0)
        return total + orderTotal
    }, 0)

    return totalRevenue
}