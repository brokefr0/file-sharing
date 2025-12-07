"use client"
import React, { useEffect, useState } from 'react'
import FileItem from './_components/FileItem'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function FileView() {
    const [file, setFile] = useState();
    const params = useParams();

    useEffect(() => {
        params?.fileId && getFileInfo();
    }, [params])

    const getFileInfo = async () => {
        try {
            const res = await fetch('/api/file/' + params.fileId);
            if (!res.ok) throw new Error('Failed to fetch file');
            const data = await res.json();
            setFile(data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className='bg-gray-100 dark:bg-gray-900 h-screen w-full flex justify-center items-center flex-col gap-4 transition-colors duration-300'>
            <Link href='/'>
                <span className="text-blue-600 font-black text-2xl">FILE SHARE</span>
            </Link>
            <div className='bg-white dark:bg-gray-800 p-5 rounded-md w-full md:w-[600px] shadow-sm transition-colors duration-300'>
                {file ? <FileItem file={file} /> : <p className='text-center text-gray-400'>Loading...</p>}
            </div>
            <Link href='/files' className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
                View all uploaded files
            </Link>
        </div>
    )
}

export default FileView
