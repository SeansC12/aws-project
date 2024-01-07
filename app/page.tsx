import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

async function redirectToRelevantPage(
  supabase: any,
  redirect: any
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
    return;
  }
  const emailDomain = user.email.split("@")[1];
  if (
    emailDomain === "sst.edu.sg" ||
    user.email === "sean.ulric.chua@gmail.com"
  ) {
    redirect("/postings");
    return;
  }
  redirect("/nurse");
}

export default async function Home() {
  const supabase = createServerComponentClient({
    cookies,
  });
  await redirectToRelevantPage(supabase, redirect);
  return <div />;
}
