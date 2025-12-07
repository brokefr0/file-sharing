"use client"
import React, { useState } from 'react'
import { Download } from 'lucide-react'
import Image from 'next/image'

function FileItem({ file }) {
    const [password, setPassword] = useState('');

    return (
        <div>
            <div className='p-5 rounded-md bg-gray-50 flex flex-col items-center justify-center border-dashed border border-blue-200'>

                {/* Preview Section: Check if it's an image */}
                {file.fileType.startsWith('image/') ? (
                    <img
                        src={file.fileUrl}
                        alt={file.fileName}
                        className='w-[300px] h-[300px] object-contain p-2'
                    />
                ) : (
                    <Image src='/file-icon.png' width={50} height={50} alt='file-icon'
                        className='w-[50px] h-[50px] p-2'
                    />
                )}

                <h2 className='text-center text-[20px] mt-2 font-semibold'>{file.fileName}</h2>
                <h2 className='text-center text-[12px] text-gray-400 font-bold'>{(file.fileSize / 1024 / 1024).toFixed(2)} MB</h2>
            </div>

            {/* Password functionality omitted for simplicity as per plan, but if file.password exists: */}
            {file.password && file.password.length > 0 ? (
                <div className='mt-5'>
                    <input
                        type='password'
                        className='p-2 border rounded-md w-full outline-blue-500'
                        placeholder='Enter Password to Access'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {file.password == password ?
                        <button
                            className='flex gap-2 p-2 bg-primary text-white bg-blue-600 rounded-full w-full items-center hover:bg-blue-700 text-[14px] mt-5 text-center justify-center'
                            onClick={() => window.open(file.downloadUrl)}
                        >
                            <Download className='h-4 w-4' /> Download
                        </button>
                        : <button className='flex gap-2 p-2 bg-gray-300 text-white rounded-full w-full items-center text-[14px] mt-5 text-center justify-center' disabled>Password Required</button>}
                </div>
            ) : (
                <div className='w-full'>
                    <button
                        className='flex gap-2 p-2 bg-primary text-white bg-blue-600 rounded-full w-full items-center hover:bg-blue-700 text-[14px] mt-5 text-center justify-center cursor-pointer'
                        onClick={() => window.open(file.downloadUrl)}
                    >
                        <Download className='h-4 w-4' /> Download
                    </button>
                </div>
            )}

            <p className='text-xs text-gray-400 mt-2 text-center'>*Terms and Conditions apply</p>

        </div>
    )
}

export default FileItem
