"use client"

import { Color } from '@prisma/client'
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
    value: z.string().min(4).regex(/^#/, { message: 'String must be a valid hex code.' })
})

type ColorFormValues = z.infer<typeof formSchema>

export const ColorForm = ({ initialData }: { initialData: Color | null, }) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter()
    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '', value: '#000000'
        }
    })

    const title = initialData ? "Edit color" : "Create color"
    const description = initialData ? "Edit a color" : "Add a new color"
    const toastMessage = initialData ? "Color updated." : "Color created."
    const action = initialData ? "Save changes" : "Create"

    const onSubmit = async (values: ColorFormValues) => {
        try {
            setLoading(true)
            if (initialData) {  // EDIT
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, values)
            }
            else {  // CREATE
                await axios.post(`/api/${params.storeId}/colors`, values)
            }
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success(toastMessage)
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong!')
        }
        finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success('Color deleted')
        } catch (error) {
            console.error(error)
            toast.error('Make sure you removed all products using this color.')
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
                        color='icon'
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
                                        <Input disabled={loading} placeholder='Color name' {...field} />
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
                                        <div className="flex items-center gap-x-4">
                                            <Input disabled={loading} placeholder='#000000' {...field} />
                                            <div className="border p-4 rounded-full" style={{ backgroundColor: field.value }} />
                                        </div>
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

