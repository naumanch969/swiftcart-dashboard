import prismadb from '@/lib/prisma'
import React from 'react'


const DashboardPage = async ({ params }: { params: { storeId: string } }) => {

    const store = await prismadb.store.findFirst({
        where: { id: params.storeId }
    })

    return (
        <div>This is {store?.name}</div>
    )
}

export default DashboardPage