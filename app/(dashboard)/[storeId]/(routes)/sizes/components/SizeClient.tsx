"use client"
import React from 'react'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'
import { SizeColumn, columns } from './columns'


const SizeClient = ({ data }: { data: SizeColumn[] }) => {

    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className='flex items-center justify-between gap-2 ' >
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Manage sizes for you store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)} >
                    <Plus className='w-4 h-4 mt-2' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey='name' />

            <Heading
                title='API'
                description='API calls for Sizes'
            />
            <Separator />
            <ApiList
                entityIdName='sizeId'
                entityName='sizes'
            />
        </>
    )
}

export default SizeClient