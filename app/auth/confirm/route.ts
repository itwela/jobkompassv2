import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createSupServerInstance } from '@/app/utils/supabase/server'
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (!token_hash || !type) {
    redirect("/auth/error");
  }

  const supabase = await createSupServerInstance();

  const { error } = await  supabase.auth.verifyOtp({
    type,
    token_hash,
  });
  if (!error) {
    // redirect user to specified redirect URL or root of app
    revalidatePath('/', 'layout');
    redirect('/dashboard/home');
  }

}
