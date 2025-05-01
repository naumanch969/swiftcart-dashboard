import React from 'react'
import prisma from '@/lib/prisma'
import { format } from 'date-fns'

import OrderClient from './components/OrderClient'
import { OrderColumn } from './components/columns'
import { formatter } from '@/lib/utils'

type Props = { params: { storeId: string } }

const OrdersPage = async ({ params }: Props) => {

    const orders = await prisma.order.findMany({
        where: { storeId: params.storeId },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });


    const formattedOrders: OrderColumn[] = orders.map((order: any) => ({
        id: order.id,
        phone: order.phone,
        address: order.address,
        products: order.orderItems.map((orderItem: any) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(order.orderItems.reduce((total: number, item: any) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: order.isPaid,
        createdAt: format(order.createdAt, 'MMMM do, yyyy')
    }))

    return (
        <div className='flex flex-col' >
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    )
}

export default OrdersPage