import prisma from '@/lib/prisma'
import React from 'react'
import { CategoryForm } from './components/category-form'


const CategoryPage = async ({ params: { categoryId, storeId } }: { params: { categoryId: string, storeId: string } }) => {


    const category = await prisma.category.findUnique({
        where: { id: categoryId }
    })

    const billboards = await prisma.billboard.findMany({
        where: { storeId: storeId }
    })

    return (
        <div className='flex flex-col ' >
            <div className='flex-1 space-y-4 p-8 pt-6' >
                <CategoryForm
                    initialData={category}
                    billboards={billboards}
                />
            </div>
        </div>
    )
}

export default CategoryPage