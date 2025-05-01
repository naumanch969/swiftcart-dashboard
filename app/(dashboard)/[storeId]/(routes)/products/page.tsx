import React from 'react'
import prisma from '@/lib/prisma'
import { format } from 'date-fns'

import ProductClient from './components/ProductClient'
import { ProductColumn } from './components/columns'
import { formatter } from '@/lib/utils'

type Props = { params: { storeId: string } }

const ProductsPage = async ({ params }: Props) => {

    const products = await prisma.product.findMany({
        where: { storeId: params.storeId },
        include: { category: true, size: true, color: true },
        orderBy: { createdAt: 'desc' }
    })

    const formattedproducts: ProductColumn[] = products.map((product: any) => ({
        id: product.id,
        name: product.name,
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        price: formatter.format(Number(product.price)),
        category: product.category.name,
        size: product.size.name,
        color: product.color.value,
        createdAt: format(product.createdAt, 'MMMM do, yyyy')
    }))

    return (
        <div className='flex flex-col' >
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedproducts} />
            </div>
        </div>
    )
}

export default ProductsPage