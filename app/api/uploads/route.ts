import { handleUpload, HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { MAX_FILE_SIZE } from "@/lib/constants";

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    console.log('[uploads] incoming request:', { method: request.method, url: (request as any).url, body });

    try {
        const response = await handleUpload({
            token: process.env.BLOB_READ_WRITE_TOKEN,
            body,
            request,
            onBeforeGenerateToken: async () => {
                let userId: string | null = null;
                try {
                    const authRes = await auth();
                    userId = authRes.userId ?? null;
                } catch (err) {
                    userId = null;
                }

                if (!userId && process.env.NODE_ENV !== 'development') {
                    throw new Error('Unauthorized : user not authenticated');
                }

                return {
                    allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
                    maxFileSize: MAX_FILE_SIZE,
                    addRandomSuffix: true,
                    tokenPayload: JSON.stringify({ userId }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                console.log('[uploads] Upload completed for blob:', blob.url);

                const Payload = tokenPayload ? JSON.parse(tokenPayload) : null;
                const userId = Payload?.userId;

                //Todo : PostHog
            },
        });

        console.log('[uploads] handleUpload response:', response && typeof response === 'object' ? { ok: true } : response);

        return NextResponse.json(response);
    } catch (e) {
        console.error('[uploads] handleUpload error:', e);
        let message = e instanceof Error ? e.message : 'An error occurred during file upload.';
        let status = message.includes('Unauthorized') ? 401 : 500;
        return NextResponse.json({ error: message }, { status });
    }
}