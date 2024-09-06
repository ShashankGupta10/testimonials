import React from 'react'
import LinkButton from './LinkButton'
import { navs } from '@/constants/hero'
import { SignedIn, UserButton, UserProfile } from '@clerk/nextjs'
import { SignedOut } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <header className="relative py-4 md:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <LinkButton
              href="/"
              variant={'none'}
              className="text-4xl font-bold text-indigo-600"
            >
              TESTIMONIALS
            </LinkButton>
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="text-gray-900">
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10">
            <div className="flex items-center space-x-6">
              {navs.left.map((nav, idx) => (
                <LinkButton
                  key={idx}
                  href={`${nav.toLowerCase()}`}
                  variant="none"
                  className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-indigo-600 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  {nav}
                </LinkButton>
              ))}
            </div>
            <div className="w-px h-5 bg-gray-300"></div>
            <SignedOut>
              <LinkButton href="/sign-in" variant={'outline'}>
                Login
              </LinkButton>
              <LinkButton href="/sign-up">Create free account</LinkButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
