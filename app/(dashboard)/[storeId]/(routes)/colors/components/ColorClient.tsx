"use client"
import React from 'react'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'
import { ColorColumn, columns } from './columns'


const ColorClient = ({ data }: { data: ColorColumn[] }) => {

    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className='flex items-center justify-between gap-2 ' >
                <Heading
                    title={`Colors (${data.length})`}
                    description="Manage colors for you store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)} >
                    <Plus className='w-4 h-4 mt-2' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey='name' />

            <Heading
                title='API'
                description='API calls for Colors'
            />
            <Separator />
            <ApiList
                entityIdName='colorId'
                entityName='colors'
            />
        </>
    )
}

export default ColorClient