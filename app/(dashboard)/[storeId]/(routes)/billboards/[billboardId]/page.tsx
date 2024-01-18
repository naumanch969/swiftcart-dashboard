import prismadb from '@/lib/prisma'
import React from 'react'
import { BillboardForm } from './components/billboard-form'


const BillboardIdPage = async ({ params: { billboardId } }: { params: { billboardId: string } }) => {


    const billboard = await prismadb.billboard.findUnique({
        where: { id: billboardId }
    })

    return (
        <div className='flex flex-col ' >
            <div className='flex-1 space-y-4 p-8 pt-6' >
                <BillboardForm
                    initialData={billboard}
                />
            </div>
        </div>
    )
}

export default BillboardIdPage