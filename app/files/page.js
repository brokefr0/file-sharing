"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../_utils/supabaseClient'
import { FileText, Image as ImageIcon, Download, ExternalLink } from 'lucide-react'

function Files() {
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFiles();
    }, [])

    const getFiles = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .storage
                .from('files')
                .list('', {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

            if (error) throw error;

            setFileList(data);
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setLoading(false);
        }
    }

    const formatSize = (bytes) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300'>
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>My Files</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and access your uploaded content</p>
                    </div>
                    <Link
                        href="/upload"
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-blue-700"
                    >
                        Upload New
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-48 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                        ))}
                    </div>
                ) : fileList.length == 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-4 mb-4">
                            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No files uploaded</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">Upload your first file to get started</p>
                        <Link
                            href="/upload"
                            className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
                        >
                            Go to Upload
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {fileList.map((file, index) => {
                            const isImage = file.metadata?.mimetype?.startsWith('image/');
                            return (
                                <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition duration-200 flex flex-col">
                                    <div className="h-48 bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden">
                                        {isImage ? (
                                            <img
                                                src={supabase.storage.from('files').getPublicUrl(file.name).data.publicUrl}
                                                alt={file.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'block';
                                                }}
                                            />
                                        ) : null}
                                        <div style={{ display: isImage ? 'none' : 'flex' }} className="items-center justify-center w-full h-full">
                                            {isImage ? (
                                                <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                            ) : (
                                                <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500 group-hover:scale-110 transition duration-300" />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition duration-200" />
                                    </div>

                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white truncate" title={file.name}>
                                            {file.name}
                                        </h3>
                                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            <span>{formatSize(file.metadata?.size)}</span>
                                            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider">
                                                {file.metadata?.mimetype?.split('/')[1] || 'FILE'}
                                            </span>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2">
                                            <Link
                                                href={`/f/${file.name}`}
                                                className="flex-1 inline-flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30 px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Files
