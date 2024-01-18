"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image';

type Props = {
    disabled?: boolean;
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
}

const ImageUpload = ({ disabled, onChange, onRemove, value }: Props) => {

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)    // found this after console.log(result)
    }

    if (!mounted) return null
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {
                    value.map((url, index) => (
                        <div key={index} className='relative w-[200px] h-[200px] rounded-md overflow-hidden ' >
                            <div className="z-10 absolute top-2 right-2 ">
                                <Button
                                    type='button'
                                    onClick={() => onRemove(url)}
                                    variant='destructive'
                                    size='icon'
                                >
                                    <Trash className='w-4 h-4' />
                                </Button>
                            </div>
                            <Image
                                fill
                                className='object-cover'
                                src={url}
                                alt='Image'
                            />
                        </div>
                    ))
                }
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset='lrhshw1q' >
                {
                    ({ open }) => {
                        const onClick = () => {
                            open()
                        }
                        return (
                            <Button type='button' disabled={disabled} variant='secondary' onClick={onClick} >
                                <ImagePlus className='h-4 w-4 pr-2' />
                                Upload Image
                            </Button>
                        )
                    }
                }
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload