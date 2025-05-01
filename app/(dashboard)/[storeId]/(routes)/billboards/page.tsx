import React from 'react'
import prisma from '@/lib/prisma'
import { format } from 'date-fns'

import BillBoardClient from './components/BillBoardClient'
import { BillboardColumn } from './components/columns'

type Props = { params: { storeId: string } }

const BillboardsPage = async ({ params }: Props) => {

    const billboards = await prisma.billboard.findMany({
        where: { storeId: params.storeId },
        orderBy: { createdAt: 'desc' }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map((billboard: any) => ({
        id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.createdAt, 'MMMM do, yyyy')
    }))

    return (
        <div className='flex flex-col' >
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillBoardClient data={formattedBillboards} />
            </div>
        </div>
    )
}

export default BillboardsPage