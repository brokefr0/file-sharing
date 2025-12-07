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
        <div className='bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4'>
            <Link href='/'>
                <span className="text-blue-600 font-black text-2xl">FILE SHARE</span>
            </Link>
            <div className='bg-white p-5 rounded-md w-full md:w-[600px] shadow-sm'>
                {file ? <FileItem file={file} /> : <p className='text-center text-gray-400'>Loading...</p>}
            </div>
        </div>
    )
}

export default FileView
