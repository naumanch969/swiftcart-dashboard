import prisma from '@/lib/prisma'
import React from 'react'
import { ColorForm } from './components/color-form'


const ColorPage = async ({ params: { colorId } }: { params: { colorId: string, storeId: string } }) => {


    const color = await prisma.color.findUnique({
        where: { id: colorId }
    })


    return (
        <div className='flex flex-col ' >
            <div className='flex-1 space-y-4 p-8 pt-6' >
                <ColorForm
                    initialData={color}
                />
            </div>
        </div>
    )
}

export default ColorPage