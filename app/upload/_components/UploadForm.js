"use client"
import React, { useState } from 'react'
import AlertMsg from './AlertMsg'
import ProgressBar from './ProgressBar'
import { useRouter } from 'next/navigation'
import { File } from 'lucide-react'
import { supabase } from '../../_utils/supabaseClient'

function UploadForm() {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const onFileSelect = (file) => {
    if (file && file.size > 10000000) { // Increased to 10MB
      setErrorMsg('File size is greater than 10MB');
      return;
    }
    setErrorMsg(null);
    setFile(file);
  }

  const uploadFile = async () => {
    if (!file) return;

    try {
      const sanitizeFileName = (name) => {
        return name.replace(/[^a-zA-Z0-9.\-_]/g, '');
      }

      const fileName = Date.now() + "-" + sanitizeFileName(file.name);

      // Upload directly to Supabase Storage 'files' bucket
      const { data, error } = await supabase
        .storage
        .from('files')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Simulate 100% progress since JS client doesn't support it easily for standard uploads
      setProgress(100);

      saveInfo(file, fileName);

    } catch (error) {
      console.error("Upload Error:", error);
      setErrorMsg("Upload failed: " + error.message);
    }
  }

  const saveInfo = async (file, blobId) => {
    // Save to local storage for "My Files"
    const localFiles = JSON.parse(localStorage.getItem('myFiles') || '[]');

    localFiles.push({
      id: blobId,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size
    });
    localStorage.setItem('myFiles', JSON.stringify(localFiles));

    router.push('/f/' + blobId);
  }

  return (
    <div className='text-center'>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-12 h-12 mb-4 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-lg md:text-2xl text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 10MB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden"
            onChange={(event) => onFileSelect(event.target.files[0])}
          />
        </label>
      </div>

      {errorMsg ? <AlertMsg msg={errorMsg} /> : null}

      {file ?
        <div className='p-5 rounded-md border border-gray-200 mt-5 flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <File className='text-blue-500' />
            <div className='text-left'>
              <h2 className='font-semibold'>{file.name}</h2>
              <h2 className='text-gray-400 text-sm'>{(file.size / 1024 / 1024).toFixed(2)} MB</h2>
            </div>
          </div>
          <span
            className='text-red-500 cursor-pointer hover:bg-red-50 p-1 rounded-full'
            onClick={() => setFile(null)}
          >
            ✕
          </span>
        </div>
        : null}

      {progress > 0 ? <ProgressBar progress={progress} /> :
        <button
          onClick={uploadFile}
          disabled={!file}
          className='p-2 bg-primary text-white w-[30%] rounded-full mt-5 bg-blue-600 disabled:bg-gray-400 hover:bg-blue-700 transition'
        >
          Upload
        </button>
      }
    </div>
  )
}

export default UploadForm;
