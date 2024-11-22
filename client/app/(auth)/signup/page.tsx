'use client'
import { Button } from '@/components/ui/button'
import { useSignup } from '@/hooks/useSignup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

const page = () => {
  const { mutate } = useSignup()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(formData, {
      onSuccess: () => {
        router.push("/login")
      }
    })
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <p className="text-3xl font-extrabold text-indigo-600">
            TESTIMONIALS
          </p>
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create an Account
            </h3>
            <p className="">
              Already have an account?{' '}
              <Link
                href={'/login'}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="name"
              name="name"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-medium">Username</label>
            <input
              type="username"
              name="username"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button
            className="w-full"
            type="submit"
          >
            Create Account
          </Button>
        </form>
      </div>
    </main>
  )
}

export default page
