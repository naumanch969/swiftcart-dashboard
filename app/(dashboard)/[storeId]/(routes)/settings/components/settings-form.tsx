"use client"

import { Store } from '@prisma/client'
import React, { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/alert-modal'
import ApiAlert from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'


const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm = ({ initialData }: { initialData: Store }) => {

    const origin = useOrigin()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter()
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (values: SettingsFormValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, values)
            router.refresh()
            toast.success('Store updated.')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!')
        }
        finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success('Store deleted')
        } catch (error) {
            console.log(error)
            toast.error('Make sure you removed all products and categories first.')
        }
        finally {
            setLoading(false)
            setOpen(false)
        }
    }


    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='flex items-center justify-between' >
                <Heading title="Settings" description="Manage store preferences" />
                <Button
                    disabled={loading}
                    variant='destructive'
                    size='icon'
                    onClick={() => setOpen(true)}
                >
                    <Trash className='w-4 h-4' />
                </Button>
            </div>
            <Separator />
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full' >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Store name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        type='submit'
                        className='ml-auto'
                    >Save changes</Button>
                </form>
            </Form>

            <Separator />

            <ApiAlert
                title='NEXT_PUBLIC_API_URL'
                description={`${origin}/api/${params.storeId}`}
                variant='public'
            />
        </>
    )
}

