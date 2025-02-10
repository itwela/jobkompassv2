'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// NOTE ---------------------------------------------------------------------------------
`
  Note: 
  I tried to create the server "client" below and it wont work.
  anytime you need to use specifically 
  
    { createClient }

    from : '@/app/utils/supabase/server'

  you have to create a new client in the file.

  HOWEVER,

  You CAN import the CLIENT SIDE supabase client 
  
    from : '@/app/utils/supabase/client'

  and use that client in all client files. This will limit how many times
  you are hitting your database saving you money. 
 `
// --------------------------------------------------------------------------------------
import { createSupServerInstance } from '@/app/utils/supabase/server'

export async function signIn(formData: FormData) {
  const supabase = await createSupServerInstance()

  // Validate inputs before proceeding
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return {
      error: true,
      message: "Email and password are required"
    }
  }

  try {

    const { data: resData, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    // Handle authentication errors
    if (error) {
      revalidatePath('/', 'layout')
      return {
        error: true,
        message: error.message
      }
    }

    // Check if user data exists
    if (!resData?.user) {
      revalidatePath('/', 'layout')
      return {
        error: true,
        message: "No user found. Please make an account with us."
      }
    }

    // Successful login
    revalidatePath('/', 'layout')
    return {
      error: false,
      message: "Login successful!"
    }    
    
  } catch (err) {
    // Handle unexpected errors
    revalidatePath('/', 'layout')
    return {
      error: true,
      message: "An unexpected error occurred. Please try again."
    }
  }

}
