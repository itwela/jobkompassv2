'use server'

import { supabaseClientClient } from "../utils/supabase/client";
import { createSupServerInstance } from "../utils/supabase/server";
// import { createClient } from "../utils/supabase/client";


const psch = process.env.NEXT_PUBLIC_PUB_SCHEMA_NAME;
const uta = process.env.NEXT_PUBLIC_USER_TABLE_NAME;

if (!psch || !uta) {
  throw new Error('PUB_SCHEMA_NAME is not defined');
}

export async function toggleColorPreference(userId: string, color: string) {
  console.log('toggleColorPreference - userId:', userId, 'color:', color);

  const supabase = await createSupServerInstance();

  // Update the color_theme if user exists
  const { data: userData, error: updateError } = await supabase
    .from('Profiles')
    .update({ color_theme: color })
    .eq('user_id', userId)
    .select();  // This returns updated rows


  return { userData, updateError };
}