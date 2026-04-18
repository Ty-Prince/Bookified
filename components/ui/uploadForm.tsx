"use client"

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UploadCloud, ImageIcon } from 'lucide-react'
import { voiceOptions as VOICE_OPTIONS_CONST, voiceCategories, DEFAULT_VOICE } from '@/lib/constants'
import { Button } from './button'
import { uploadSchema } from '@/lib/zod'

type UploadFormValues = z.infer<typeof uploadSchema>

const voiceOptions = Object.entries(VOICE_OPTIONS_CONST).map(([key, info]) => {
  const group = voiceCategories?.male?.includes(key)
    ? 'Male Voices'
    : voiceCategories?.female?.includes(key)
      ? 'Female Voices'
      : 'Voices'

  return {
    value: key,
    label: info.name,
    description: info.description,
    group,
  }
})

const formatSelectedFile = (fileList?: FileList | null) => {
  if (!fileList || fileList.length === 0) return null
  return fileList[0].name
}

const UploadForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      voice: DEFAULT_VOICE,
    },
  })

  const bookFile = watch('bookFile') as FileList | undefined
  const coverImage = watch('coverImage') as FileList | undefined
  const selectedBookFile = formatSelectedFile(bookFile)
  const selectedCoverImage = formatSelectedFile(coverImage)

  const getErrorMessage = (error: unknown) => {
    if (!error || typeof error !== 'object') {
      return undefined
    }

    if ('message' in error && typeof (error as { message?: unknown }).message === 'string') {
      return (error as { message: string }).message
    }

    return undefined
  }

  const bookFileError = getErrorMessage(errors.bookFile)
  const coverImageError = getErrorMessage(errors.coverImage)

  const onSubmit = (values: UploadFormValues) => {
    console.log('Form submitted', values)
    // Replace this with actual upload / synthesis flow.
  }

  return (
    <section className="mx-auto mt-10 max-w-4xl rounded-[12px] bg-white/90 border border-[rgba(33,42,59,0.08)] p-8 shadow-soft-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-8">
          <div>
            <label className="text-base font-medium text-(--text-primary)">Book PDF File</label>
            <label
              htmlFor="bookFile"
                className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[12px] border border-[rgba(33,42,59,0.12)] bg-[#fcf6ed] px-6 py-12 text-center transform transition-transform duration-150 ease-in-out hover:-translate-y-1 hover:scale-100 hover:shadow-soft-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#e9dcc8] text-(--text-primary)">
                <UploadCloud size={28} />
              </div>
              <p className="text-lg font-semibold text-(--text-primary)">Click to upload PDF</p>
              <p className="text-sm text-(--text-secondary)">PDF file (max 50MB)</p>
              {selectedBookFile ? (
                <p className="mt-2 text-sm text-(--text-primary)">Selected: {selectedBookFile}</p>
              ) : (
                <p className="mt-2 text-sm text-(--text-secondary)">Drag & drop or browse files</p>
              )}
            </label>
            <input
              id="bookFile"
              type="file"
              accept="application/pdf"
              className="sr-only"
              {...register('bookFile')}
            />
            {bookFileError && (
              <p className="mt-2 text-sm text-red-600">{bookFileError}</p>
            )}
          </div>

          <div>
            <label className="text-base font-medium text-(--text-primary)">Cover Image (Optional)</label>
            <label
              htmlFor="coverImage"
                className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[12px] border border-[rgba(33,42,59,0.12)] bg-[#fcf6ed] px-6 py-12 text-center transform transition-transform duration-150 ease-in-out hover:-translate-y-1 hover:scale-100 hover:shadow-soft-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#e9dcc8] text-(--text-primary)">
                <ImageIcon size={26} />
              </div>
              <p className="text-lg font-semibold text-(--text-primary)">Click to upload cover image</p>
              <p className="text-sm text-(--text-secondary)">Leave empty to auto-generate from PDF</p>
              {selectedCoverImage ? (
                <p className="mt-2 text-sm text-(--text-primary)">Selected: {selectedCoverImage}</p>
              ) : (
                <p className="mt-2 text-sm text-(--text-secondary)">Supported formats: JPG, PNG</p>
              )}
            </label>
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              className="sr-only"
              {...register('coverImage')}
            />
            {coverImageError && (
              <p className="mt-2 text-sm text-red-600">{coverImageError}</p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="title" className="label">Title</label>
              <input
                id="title"
                placeholder="ex: Rich Dad Poor Dad"
                className="input-reset rounded-3xl w-full border border-[rgba(33,42,59,0.12)] bg-[#fffdf8] px-4 py-4 text-base text-(--text-primary) shadow-sm"
                {...register('title')}
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="label">Author Name</label>
              <input
                id="author"
                placeholder="ex: Robert Kiyosaki"
                className="input-reset rounded-3xl w-full border border-[rgba(33,42,59,0.12)] bg-[#fffdf8] px-4 py-4 text-base text-(--text-primary) shadow-sm"
                {...register('author')}
              />
              {errors.author && <p className="text-sm text-red-600">{errors.author.message}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-base font-semibold text-(--text-primary)">Choose Assistant Voice</p>
            </div>
            <div className='pb-6 space-y-2'>
              <p className='text-gray-600 mt-2'>Male Voice</p>
              <div className="grid gap-4 md:grid-cols-3">
                {voiceOptions
                  .filter((option) => option.group === 'Male Voices')
                  .map((option) => (
                    <label
                      key={option.value}
                      className="rounded-[22px] border border-[rgba(33,42,59,0.12)] bg-[#fffdf8] p-4 transform transition-transform duration-150 ease-in-out hover:scale-105 hover:shadow-soft-lg"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        className="mr-3 accent-(--color-brand)"
                        {...register('voice')}
                      />
                      <span className="font-semibold text-(--text-primary)">{option.label}</span>
                      <p className="mt-2 text-sm text-(--text-secondary)">{option.description}</p>
                    </label>
                  ))}
              </div>
            </div>
            <div className='pb-6 space-y-2'>
              <p className='text-gray-600 mt-2'>Female Voice</p>
              <div className="grid gap-4 md:grid-cols-2">
                {voiceOptions
                  .filter((option) => option.group === 'Female Voices')
                  .map((option) => (
                    <label
                      key={option.value}
                      className="rounded-[22px] border border-[rgba(33,42,59,0.12)] bg-[#fffdf8] p-4 transform transition-transform duration-150 ease-in-out hover:scale-105 hover:shadow-soft-lg"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        className="mr-3 accent-(--color-brand)"
                        {...register('voice')}
                      />
                      <span className="font-semibold text-(--text-primary)">{option.label}</span>
                      <p className="mt-2 text-sm text-(--text-secondary)">{option.description}</p>
                    </label>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full rounded-[18px] bg-[#663820] px-6 py-5 text-lg font-semibold text-white shadow-soft transform transition-transform duration-150 ease-in-out hover:bg-[#7a4528] hover:-translate-y-1 hover:shadow-soft-lg"
            disabled={isSubmitting}
          >
            Begin Synthesis
          </Button>
        </div>
      </form>
    </section>
  )
}

export default UploadForm
