import { z } from 'zod'
import { MAX_FILE_SIZE, MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPES } from './constants'

export const uploadSchema = z.object({
  pdfFile: z
    .custom<FileList>()
    .transform((list) => list?.[0]) // Transform FileList to the first File
    .refine((file) => file instanceof File, {
      message: 'Please upload a PDF file.',
    })
    .refine((file) => file && ACCEPTED_PDF_TYPES.includes(file.type), {
      message: 'Only PDF files are accepted.',
    })
    .refine((file) => file && file.size <= MAX_FILE_SIZE, {
      message: 'File size must be less than 50MB.',
    }),
    
  coverImage: z
    .custom<FileList>()
    .transform((list) => list?.[0]) // Transform FileList to the first File
    .optional()
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      { message: 'Cover must be a valid image (JPG/PNG).', }
    )
    .refine(
      (file) => !file || (file instanceof File && file.size <= MAX_IMAGE_SIZE),
      { message: 'Cover image size must be less than 5MB.', }
    ),

  title: z.string().trim().min(1, 'Title is required.'),
  author: z.string().trim().min(1, 'Author name is required.'),
  voice: z.string().min(1, 'Please select a voice.'),
})
