"use client"

import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

const formSchema = z.object({
    name: z.string().min(3)
})

export const StoreModal = () => {

    ////////////////////////////////////////////// HOOKS ////////////////////////////////////
    const [loading, setLoading] = useState<boolean>(false)
    const storeModal = useStoreModal()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    ////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const { data } = await axios.post('/api/stores', values)
            window.location.assign(`/${data.id}`)   // navigate to dashboard after refreshing the page
        } catch (error) {
            toast.error('Something went wrong!')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title='Create store'
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div className="">
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='E-commerce' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full ">
                                <Button disabled={loading} variant='outline' onClick={storeModal.onClose} >Cancel</Button>
                                <Button disabled={loading} type='submit' >Continure</Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </div>
        </Modal>
    )
}