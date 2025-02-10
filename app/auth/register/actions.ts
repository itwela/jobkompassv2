'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupServerInstance } from '@/app/utils/supabase/server'
import { makeNewUser } from '@/app/helpers/utilityFunctions'


export async function signUp(formData: FormData) {
    const supabase = await createSupServerInstance()

    // in practice, you should validate your inputs
    // Validate inputs before proceeding
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      return {
        error: true,
        message: "Email and password are required"
      }
    }

    const signUpData_Auth = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const signUpData_Account = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      // and more stuff here
    }

    try {

      // SECTION -------------------------------------------------------------------------------------------
          // NOTE here is where I will crate the users table in supabase
      const { data: resData, error } = await supabase.auth.signUp(signUpData_Auth)
      if (error) {
        revalidatePath('/', 'layout')
        return {
          error: true,
          message: error.message
        }
      }
      if (resData.user && resData.user.identities && resData.user.identities.length === 0) {
        return {
          error: true,
          message: "Email already in use",
        };
      }
  // END -------------------------------------------------------------------------------------------




      // SECTION -------------------------------------------------------------------------------------------
          // NOTE here is where I will crate the users table in supabase
      const create = await makeNewUser(resData, formData)
      if (create.userError) {
        return {
          error: true,
          message: create.userError.message
        };
      }
  // END -------------------------------------------------------------------------------------------
    


     
    // SECTION -------------------------------------------------------------------------------------------
      // NOTE User successfully created
    return {
      success: true,
      message: "Check your email for the confirmation link",
    };
// END -------------------------------------------------------------------------------------------
      


    // SECTION -------------------------------------------------------------------------------------------
      // NOTE catch all errors
  } catch (err) {
      // Handle unexpected errors
      revalidatePath('/', 'layout')
      return {
        error: true,
        message: "An unexpected error occurred. Please try again."
      }
  }
// END -------------------------------------------------------------------------------------------


}