"use client"

import React from 'react'
import UploadForm from '@/components/ui/uploadForm'

const page = () => {
  return (
    <main className='pt-20 mx-auto px-5 md:px-7 lg:px-40'>
      <div>
      <h1 className='text-2xl font-bold'>Add New Book</h1>
      <p className='text-gray-600 mt-2'>Upload PDF to Generate intaractive interview</p>
      </div>

      <UploadForm />

    </main>
  )
}

export default page
/*
Design a modern, minimal web app interface for uploading a book PDF to generate an interactive interview. Use a soft beige background with rounded white input cards and subtle shadows.

Use Shadcn/ui with react-hook form and zod validation for form handling. 
Layout from top to bottom:

Header text: “Upload a PDF to generate your interactive interview”
Subtext: “5 of 10 books used (Upgrade)”

Upload Section:

Large drag-and-drop card labeled “Book PDF File”
Center icon: upload arrow
Text: “Click to upload PDF”
Subtext: “PDF file (max 50MB)”

Cover Image Section:

Similar upload card labeled “Cover Image (Optional)”
Image icon
Text: “Click to upload cover image”
Subtext: “Leave empty to auto-generate from PDF”

Form Fields:

Title input field with placeholder: “ex: Rich Dad Poor Dad”
Author Name input field with placeholder: “ex: Robert Kiyosaki”

Voice Selection:

Section title: “Choose Assistant Voice”

Male voices (3 selectable cards with radio buttons):

Dave: “Young male, British-Essex, casual & conversational”
Daniel: “Middle-aged male, British, authoritative but warm”
Chris: “Male, casual & easy-going”

Female voices (2 selectable cards):

Rachel (selected): “Young female, American, calm & clear”
Sarah: “Young female, American, soft & approachable”

Call to Action:

Large rounded button at bottom: “Begin Synthesis”
Dark brown color with white text

Style:

use utility from globle.css
Clean SaaS dashboard aesthetic
Rounded corners, soft shadows
Neutral earthy color palette (beige, cream, brown accents)
Clear typography and spacing

install nessecary dependencies required for the form handling and validation
*/