import prismadb from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

import Navbar from '@/components/navbar'


const DashboardLayout = async ({ children, params }: { children: ReactNode, params: { storeId: string } }) => {

    const { userId } = auth()

    if (!userId) redirect('/sign-in')


    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId, userId
        }
    })

    if (!store) redirect('/')


    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default DashboardLayout