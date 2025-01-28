import React from 'react'
import { MdArrowBackIos, MdOutlineKeyboardBackspace } from 'react-icons/md'
type BackProps = {
    onBack: () => void;
}
function Back({ onBack }: BackProps) {
    return (
        <button  title='Back' className='py-3 text-gray-500 bg-white border text-sm px-6 font-semibold  shadow-sm rounded-xl  cursor-pointer mb-4' onClick={onBack}>
            <div className='flex gap-3 items-center'>
                {/* <MdOutlineKeyboardBackspace /> */}
                <MdArrowBackIos />
                Back
            </div>
        </button>
    )
}

export default Back