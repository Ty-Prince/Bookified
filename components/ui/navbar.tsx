
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navbar = () => {
  return (
    <header>
        <div>
            <Link href={"/"}>
                <Image src={"/assets/logo.png"} width={40} height={40} alt='n'></Image>
            </Link>
            <span>Bookfied</span>
        </div>

        <nav>

        </nav>
    </header>
  )
}

export default navbar
