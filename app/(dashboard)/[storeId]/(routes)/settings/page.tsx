import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

import { SettingsForm } from './components/settings-form'

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {

    const { userId } = auth()
    if (!userId) redirect('/sign-in')

    const store = await prisma.store.findFirst({
        where: { userId, id: params.storeId }
    })

    if (!store) redirect('/')

    return (
        <div className='flex flex-col ' >
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}

export default SettingsPage