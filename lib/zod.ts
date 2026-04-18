
import { z } from 'zod'


export const uploadSchema = z.object({
  bookFile: z
    .any()
    .refine((files) => files instanceof FileList && files.length === 1, {
      message: 'Please upload a PDF file.',
    })
    .refine((files) => files instanceof FileList && files[0]?.type === 'application/pdf', {
      message: 'Only PDF files are accepted.',
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
    ),
  title: z.string().min(2, 'Title is required.'),
  author: z.string().min(2, 'Author name is required.'),
  voice: z.enum(['dave', 'daniel', 'chris', 'rachel', 'sarah']),
})
