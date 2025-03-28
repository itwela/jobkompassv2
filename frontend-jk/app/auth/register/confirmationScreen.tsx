'use client'

import Link from "next/link"

export default function ConfirmationScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="max-w-md w-full space-y-8 text-center">
    <h2 className="text-2xl font-bold">Verify Your Email</h2>
    <p className="text-gray-600">
        Thanks for signing up! We've sent a verification email to your inbox. 
        Please check your email and click the verification link to activate your account.
    </p>
    <p className="text-gray-600">
        Once you have confirmed your account, you can close this window! 
    </p>
    <div className="mt-4">
        <Link
        href="/auth/login"
        className="text-blue-500 hover:text-blue-600"
        >
        Go to Login
        </Link>
    </div>
    </div>
    </div>
  )
}
