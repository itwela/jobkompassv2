'use client'

import Link from "next/link"
import { SubmitButton } from "./submitButton"
import { signIn } from "./actions"
import { useJobKompassAuth } from "@/app/helpers/providers/authContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"

export default function LoginClient({ searchParams }: { searchParams: { message: string } }) {
  const { authEmail, setAuthEmail, authPassword, setAuthPassword } = useJobKompassAuth()
  const { isAuthenticated, setIsAuthenticated } = useJobKompassUser()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [serverSuccess, setServerSuccess] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setServerError(null)
    setServerSuccess(null)

    try {
      const result = await signIn(formData)
      
      if (result.error === true) {
        setServerError(result.message)
        return
      }
      
      setServerSuccess("Login successful!")
      setTimeout(() => {
        setIsAuthenticated(true)
        router.push("/dashboard/home")
      }, 361)

    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full px-8 sm:max-w-md">
      <Link
        href="/"
        className="py-2 px-4 rounded no-underline text-foreground hover:bg-gray-100 flex items-center text-sm"
      >
        Back
      </Link>

      <form className="space-y-4 w-full" action={handleSubmit}>
        <div className="space-y-2">
          <label className="text-md font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 border rounded bg-inherit"
            name="email"
            placeholder="you@example.com"
            required
            onChange={(e) => setAuthEmail?.(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-md font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 border rounded bg-inherit"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            onChange={(e) => setAuthPassword?.(e.target.value)}
          />
        </div>

        {serverSuccess && (
          <p className="text-green-500 text-sm mt-2">{serverSuccess}</p>
        )}

        {serverError && (
          <p className="text-red-500 text-sm mt-2">{serverError}</p>
        )}

        <div className="space-y-2">
          <SubmitButton
            className="w-full p-2 text-white rounded hover:bg-blue-600 bg-blue-500"
            pendingText="Signing In..."
          >
            {isLoading ? 'Signing In...' : 'Log In'}
          </SubmitButton>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <Link href="/auth/register" className="text-blue-500 hover:text-blue-600">
              Sign Up
            </Link>
          </div>
        </div>

        {searchParams?.message && (
          <div className="p-4 bg-red-100 text-red-600 rounded text-center">
            {searchParams.message}
          </div>
        )}
      </form>
    </div>
  )
}