
import { z } from 'zod'
import { MAX_FILE_SIZE, MAX_IMAGE_SIZE , ACCEPTED_IMAGE_TYPES , ACCEPTED_PDF_TYPES } from './constants'


export const uploadSchema = z.object({
  bookFile: z
    .any()
    .refine((files) => files instanceof FileList && files.length === 1, {
      message: 'Please upload a PDF file.',
    })
    .refine((files) => files && ACCEPTED_PDF_TYPES.includes(files[0]?.type), { message: 'Only PDF files are accepted. ', })
    .refine((files) => files instanceof FileList && files[0]?.size <= MAX_FILE_SIZE, {
      message: 'file size must be less than 50MB.',
    }),
  coverImage: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files instanceof FileList && files[0]?.type.startsWith('image/')),
      {
        message: 'Cover must be an image.',
      }
    )
    .refine(
      (files) => files instanceof FileList && files[0]?.size <= MAX_IMAGE_SIZE,
      {
        message: 'Cover image size must be less than 5MB.',
      }
    ),
  title: z.string().min(2, 'Title is required.'),
  author: z.string().min(2, 'Author name is required.'),
  voice: z.enum(['dave', 'daniel', 'chris', 'rachel', 'sarah']),
  // Ensure uploaded PDF size is within limit
})
