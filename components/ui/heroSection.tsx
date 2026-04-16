
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const HeroSection = async () => {


  return (

      <section className="px-5 md:px-7 lg:px-40 pt-20 pb-10 lg:pt-20 lg-pb-10 w-full">
        <div className="library-hero-card">
          <div className="library-hero-content">
            {/* LEFT: Title + CTA */}
            <div className="library-hero-text">
              <h1 className="library-hero-title">Your Library</h1>
              <p className="library-hero-description">
                Convert your books into interactive AI conversations. Listen, learn, and discuss your favorite reads.
              </p>

              <div className="mt-6 w-full lg:w-auto">
                <Link href="/books/new" className="library-cta-primary" aria-label="Add new book">
                  <span className="text-xl">+</span>
                  <span className="ml-2">Add new book</span>
                </Link>
              </div>
            </div>

            {/* CENTER: Illustration (mobile + desktop variants for responsive sizing) */}
            <div className="library-hero-illustration lg:hidden mt-6">
              <Image
                src="/assets/hero-illustration.png"
                alt="Illustration of books and a globe"
                width={320}
                height={220}
                className="object-contain"
                sizes="(max-width: 640px) 280px, 320px"
                priority
              />
            </div>

            <div className="library-hero-illustration-desktop">
              <Image
                src="/assets/hero-illustration.png"
                alt="Illustration of books and a globe"
                width={520}
                height={360}
                className="object-contain"
                sizes="(max-width: 1024px) 420px, 520px"
                priority
              />
            </div>

            {/* RIGHT: Steps card (desktop) / stacked (mobile) */}
            <div className="hidden lg:block lg:ml-8">
              <div className="library-steps-card shadow-soft-lg">
                <ul className="space-y-6 p-6">
                  <li className="library-step-item">
                    <div className="library-step-number">1</div>
                    <div>
                      <h3 className="library-step-title">Upload PDF</h3>
                      <p className="library-step-description">Add your book file</p>
                    </div>
                  </li>

                  <li className="library-step-item">
                    <div className="library-step-number">2</div>
                    <div>
                      <h3 className="library-step-title">AI Processing</h3>
                      <p className="library-step-description">We analyze the content</p>
                    </div>
                  </li>

                  <li className="library-step-item">
                    <div className="library-step-number">3</div>
                    <div>
                      <h3 className="library-step-title">Voice/Text Chat</h3>
                      <p className="library-step-description">Discuss with AI</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile steps (below on small screens) */}
            <div className="lg:hidden mt-6 w-full">
              <div className="library-steps-card">
                <ul className="space-y-4 p-4">
                  <li className="library-step-item">
                    <div className="library-step-number">1</div>
                    <div>
                      <h3 className="library-step-title">Upload PDF</h3>
                      <p className="library-step-description">Add your book file</p>
                    </div>
                  </li>

                  <li className="library-step-item">
                    <div className="library-step-number">2</div>
                    <div>
                      <h3 className="library-step-title">AI Processing</h3>
                      <p className="library-step-description">We analyze the content</p>
                    </div>
                  </li>

                  <li className="library-step-item">
                    <div className="library-step-number">3</div>
                    <div>
                      <h3 className="library-step-title">Voice/Text Chat</h3>
                      <p className="library-step-description">Discuss with AI</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}

export default HeroSection
