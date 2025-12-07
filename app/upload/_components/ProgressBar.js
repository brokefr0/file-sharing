import React from 'react'

function ProgressBar({ progress = 0 }) {
    return (
        <div className='bg-gray-400 w-full h-4 mt-3 rounded-full overflow-hidden'>
            <div
                className='bg-blue-600 h-full text-[10px] text-white text-center transition-all duration-300'
                style={{ width: `${progress}%` }}
            >
                {`${Number(progress).toFixed(0)}%`}
            </div>
        </div>
    )
}

export default ProgressBar
