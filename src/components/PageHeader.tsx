import React from 'react'
type PageHaderProps = {
    title: string;
}
function PageHeader({ title }: PageHaderProps) {
    return (
        <div className='py-4 text-3xl font-bold text-[#5C5E64]'>{title}</div>
    )
}

export default PageHeader