'use client'

import Link from "next/link"
import { SubmitButton } from "./submitButton"
import { signUp } from "./actions"
import { useJobKompassAuth } from "@/app/helpers/providers/authContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import ConfirmationScreen from "./confirmationScreen"

export default function RegisterClient({ searchParams }: { searchParams: { message: string } }) {
  const { authEmail, setAuthEmail, authPassword, setAuthPassword } = useJobKompassAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [serverSuccess, setServerSuccess] = useState<string | null>(null)
  const [showConfirmationScreen,setShowConfirmationScreen] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
      setIsLoading(true)
      setServerError(null)
      setServerSuccess(null)

      const result = await signUp(formData)
      
      if (result.error === true) {
        setServerError(result.message)
        return
      }
      setServerSuccess('Email sent!')
      setShowConfirmationScreen(true)      
      setIsLoading(false)
  }

  return (
    <>

    {showConfirmationScreen === false && (
      <>
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
              className="w-full p-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
              pendingText="Signing Up..."
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
              </SubmitButton>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Already have an account?</p>
              <Link href="/auth/login" className="text-blue-500 hover:text-blue-600">
                Log In
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
      </>
    )}

    {showConfirmationScreen === true && serverSuccess && (
      <>
      <div className="space-y-4 w-full px-8 sm:max-w-md">
        <ConfirmationScreen/>
      </div>
      </>
    )}

    </>
  )
}