import { NextResponse } from "next/server";
import { supabase } from "../../../_utils/supabaseClient";

export async function GET(req, { params }) {
    const { id } = await params;

    try {
        // 1. Get Metadata by searching for the file in the bucket
        // 'files' is the bucket name we assumed in UploadForm
        const { data: files, error: listError } = await supabase
            .storage
            .from('files')
            .list('', {
                limit: 1,
                offset: 0,
                search: id
            });

        if (listError) throw listError;

        // Find exact match if needed, or assume first result is correct if IDs are unique appropriately
        const fileData = files.find(f => f.name === id) || (files.length > 0 ? files[0] : null);

        if (!fileData) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        // 2. Generate Signed URL for View (Inline)
        const { data: signedData, error: signError } = await supabase
            .storage
            .from('files')
            .createSignedUrl(id, 3600); // 1 hour validity

        if (signError) throw signError;

        // 3. Generate Signed URL for Download (Attachment)
        const { data: downloadData, error: downloadError } = await supabase
            .storage
            .from('files')
            .createSignedUrl(id, 3600, {
                download: true
            });

        if (downloadError) throw downloadError;

        return NextResponse.json({
            id: id,
            fileName: fileData.name,
            fileType: fileData.metadata?.mimetype || 'application/octet-stream',
            fileSize: fileData.metadata?.size || 0,
            fileUrl: signedData.signedUrl,
            downloadUrl: downloadData.signedUrl,
            password: '',
            uploadDate: fileData.created_at
        });

    } catch (error) {
        console.error("File Fetch Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
