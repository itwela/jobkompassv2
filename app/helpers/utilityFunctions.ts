
import { createSupServerInstance } from "../utils/supabase/server";
import { supabaseClientClient } from "../utils/supabase/client";
import {  } from "../utils/supabase/server";



    // SECTION -----------------------------------------------
      // NOTE SUPABASE 
      const supabase = await createSupServerInstance()

      export async function makeNewUser( resData: any, formData: any ) {
            
          const { data: userData, error: userError } = await supabase
          .schema('public')
          .from('Profiles')
          .insert({
            id: resData.user?.id,
            email: resData.user?.email,
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            phone: formData.get('phone') as string,
          })
          .select()
      
          return { userData, userError }
      
      }

      export async function signOut() {
        const { error } = await supabaseClientClient.auth.signOut();
        if (error) {
            throw error;
        }
      }

// END --------------------------------------------------------
