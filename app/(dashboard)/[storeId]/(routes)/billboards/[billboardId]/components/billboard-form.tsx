"use client"

import { Billboard } from '@prisma/client'
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
import ImageUpload from '@/components/ui/image-upload'


const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>

export const BillboardForm = ({ initialData }: { initialData: Billboard | null }) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter()
    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '', imageUrl: ''
        }
    })

    const title = initialData ? "Edit billboard" : "Create Billboard"
    const description = initialData ? "Edit a billboard" : "Add a new Billboard"
    const toastMessage = initialData ? "Billboard updated." : "Billboard created."
    const action = initialData ? "Save changes" : "Create"

    const onSubmit = async (values: BillboardFormValues) => {
        try {
            setLoading(true)
            if (initialData) {  // EDIT
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, values)
            }
            else {  // CREATE
                await axios.post(`/api/${params.storeId}/billboards`, values)
            }
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success('Billboard deleted')
        } catch (error) {
            console.log(error)
            toast.error('Make sure you removed all categories using this billboard.')
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
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Billboard label' {...field} />
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

