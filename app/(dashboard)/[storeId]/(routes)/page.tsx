import React from 'react'

import prisma from '@/lib/prisma'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCardIcon, DollarSignIcon, Package } from 'lucide-react'
import { formatter } from '@/lib/utils'
import { getTotalRevenure } from '@/actions/get-total-revenure'
import { getSalesCount } from '@/actions/get-sales-count'
import { getStockCount } from '@/actions/get-stock-count'
import Overview from '@/components/overview'
import { getGraphRevenue } from '@/actions/get-graph-revenure'


const DashboardPage = async ({ params }: { params: { storeId: string } }) => {

    const totalRevenue = await getTotalRevenure(params.storeId)
    const salesCount = await getSalesCount(params.storeId)
    const stockCount = await getStockCount(params.storeId)
    const graphRevenue = await getGraphRevenue(params.storeId)

    return (
        <div className='flex flex-col' >
            <div className="flex-1 space-y-4 p-8 pt-6 ">
                <Heading title='Dashboard' description='Overview of your store' />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2' >
                            <CardTitle className='text-base font-medium' >Total Revenue</CardTitle>
                            <DollarSignIcon className='w-4 h-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent className='' >
                            <div className="text-2xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2' >
                            <CardTitle className='text-base font-medium' >Sales</CardTitle>
                            <CreditCardIcon className='w-4 h-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent className='' >
                            <div className="text-2xl font-bold">
                                {salesCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2' >
                            <CardTitle className='text-base font-medium' >Products In Stock</CardTitle>
                            <Package className='w-4 h-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent className='' >
                            <div className="text-2xl font-bold">
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className='col-span-4' >
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className='pl-2'>
                        <Overview data={graphRevenue} />
                    </CardContent>
                </Card>

            </div>

        </div>
    )
}

export default DashboardPage