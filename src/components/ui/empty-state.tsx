import Image from 'next/image'
import React from 'react'

interface EmptyStateProps {
    title: string,
    description: string,
    imageSrc: string,
}

const EmptyState = ({title, description, imageSrc}: EmptyStateProps) => {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
        <Image
            src={imageSrc}
            alt ={title}
            height={90}
            width={90}
            className='w-48 h-48 mb-4'
        />
        <h2 className='text-xl font-semibold text-gray-500'>{title}</h2>
        <p className='text-gray-400'>{description}</p>
    </div>
  )
}

export default EmptyState