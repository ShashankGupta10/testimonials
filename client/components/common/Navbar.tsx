'use client'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { Button } from '../ui/button'
import { useLogout } from '@/hooks/useLogout'
import { useRouter } from 'next/navigation'
import LinkButton from './LinkButton'
import Link from 'next/link'

const Navbar = () => {
  const { data } = useCheckAuth()
  const { mutate } = useLogout()
  const router = useRouter()

  const handleLogout = () => {
    mutate()
    router.push('/')
  }
  return (
    <header className="relative py-4 md:py-6 shadow-sm">
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
            {!data ? (
              <>
                <LinkButton href="/login" variant={'outline'}>
                  Login
                </LinkButton>
                <LinkButton href="/signup">Create free account</LinkButton>
              </>
            ) : (
              <>
                <Link href="/app/dashboard" className='text-gray-600 hover:text-gray-800 transition duration-100'>
                    Dashboard
                </Link>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
