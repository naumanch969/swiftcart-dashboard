"use client"

import React from 'react'
import { Copy, Server } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

type Props = {
    title: string,
    description: string,
    variant: 'public' | 'admin'
}

const TextMap: Record<Props["variant"], string> = { // Props["variant"]: key, string:value
    public: 'Public',
    admin: 'Admin'
}
const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
    public: 'secondary',
    admin: 'destructive'
}

const ApiAlert = ({ title, description, variant = 'public' }: Props) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success('API Route copied to the clipboard.')
    }

    return (
        <Alert>
            <Server className='h-4 w-4' />
            <AlertTitle className='flex items-center gap-x-2' >
                {title}
                <Badge variant={variantMap[variant]} >{TextMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className='ml-4 flex items-center justify-between' >
                <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold '>
                    {description}
                </code>
                <Button variant='outline' size='icon' onClick={onCopy} >
                    <Copy className='h-4 w-4' />
                </Button>
            </AlertDescription>
        </Alert>
    )
}

export default ApiAlert