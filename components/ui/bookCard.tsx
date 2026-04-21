import { bookcardprops } from '@/types'
import Link from "next/link"
import React from 'react'

const BookCard = ({ title, coverURL, author, slug }: bookcardprops) => {
    return (
        <Link href={`/books/${slug}`} >
            <article className='book-card'>
                <figure className='book-card-figure'>
                    <div className='book-card-cover-wrapper'>
                        <img src={coverURL} alt={title} height={200} width={133} />
                    </div>

                    <figcaption className='book-card-meta'>
                        <h3 className='book-card-title'>{title}</h3>
                        <p className='book-card-author'>{author}</p>
                    </figcaption>
                </figure>
            </article>
        </Link>
    )
}

export default BookCard
