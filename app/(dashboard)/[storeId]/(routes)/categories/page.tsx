import React from 'react'
import prisma from '@/lib/prisma'
import { format } from 'date-fns'

import CategoryClient from './components/CategoryClient'
import { CategoryColumn } from './components/columns'

type Props = { params: { storeId: string } }

const CategoriesPage = async ({ params }: Props) => {

    const categories = await prisma.category.findMany({
        where: { storeId: params.storeId },
        include: { billboard: true },
        orderBy: { createdAt: 'desc' }
    })

    const formattedCategories: CategoryColumn[] = categories.map((category: any) => ({
        id: category.id,
        name: category.name,
        billboardLabel: category.billboard.label,
        createdAt: format(category.createdAt, 'MMMM do, yyyy')
    }))

    return (
        <div className='flex flex-col' >
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}

export default CategoriesPage