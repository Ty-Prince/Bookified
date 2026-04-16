import React from 'react'
import HeroSection from '@/components/ui/heroSection'
import { sampleBooks } from '@/lib/constants'
import BookCard from '@/components/ui/bookCard'

const page = async () => {

  return (
    <div >
      <HeroSection />

      <div className='library-books-grid w-full px-5 md:px-7 lg:px-40'>
        {sampleBooks.map((book) =>
          <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />
        )}
      </div>
    </div>
  )
}

export default page
