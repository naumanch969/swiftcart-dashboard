import prisma from '@/lib/prisma'
import React from 'react'
import { SizeForm } from './components/size-form'


const SizePage = async ({ params: { sizeId } }: { params: { sizeId: string, storeId: string } }) => {


    const size = await prisma.size.findUnique({
        where: { id: sizeId }
    })


    return (
        <div className='flex flex-col ' >
            <div className='flex-1 space-y-4 p-8 pt-6' >
                <SizeForm
                    initialData={size}
                />
            </div>
        </div>
    )
}

export default SizePage