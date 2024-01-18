"use client"

import { Size } from '@prisma/client'
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


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
})

type SizeFormValues = z.infer<typeof formSchema>

export const SizeForm = ({ initialData }: { initialData: Size | null, }) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter()
    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '', value: ''
        }
    })

    const title = initialData ? "Edit size" : "Create size"
    const description = initialData ? "Edit a size" : "Add a new size"
    const toastMessage = initialData ? "Size updated." : "Size created."
    const action = initialData ? "Save changes" : "Create"

    const onSubmit = async (values: SizeFormValues) => {
        try {
            setLoading(true)
            if (initialData) {  // EDIT
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, values)
            }
            else {  // CREATE
                await axios.post(`/api/${params.storeId}/sizes`, values)
            }
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)
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
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success('Size deleted')
        } catch (error) {
            console.log(error)
            toast.error('Make sure you removed all products using this size.')
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
                <Heading title={title} description={description} />
                {
                    initialData &&
                    <Button
                        disabled={loading}
                        variant='destructive'
                        size='icon'
                        onClick={() => setOpen(true)}
                    >
                        <Trash className='w-4 h-4' />
                    </Button>
                }
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
                                        <Input disabled={loading} placeholder='Size name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Size value' {...field} />
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
                    >{action}</Button>
                </form>
            </Form>

            <Separator />


        </>
    )
}

