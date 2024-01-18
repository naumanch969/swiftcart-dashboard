import prismadb from '@/lib/prisma'
import React from 'react'
import { ProductForm } from './components/product-form'


const ProductsIdPage = async ({ params: { productId, storeId } }: { params: { productId: string, storeId: string } }) => {


    const product = await prismadb.product.findUnique({
        where: { id: productId },
        include: { images: true }
    })

    const categories = await prismadb.category.findMany({
        where: { storeId },
    })

    const sizes = await prismadb.size.findMany({
        where: { storeId },
    })

    const colors = await prismadb.color.findMany({
        where: { storeId },
    })

    return (
        <div className='flex flex-col ' >
            <div className='flex-1 space-y-4 p-8 pt-6' >
                <ProductForm
                    initialData={product}
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                />
            </div>
        </div>
    )
}

export default ProductsIdPage