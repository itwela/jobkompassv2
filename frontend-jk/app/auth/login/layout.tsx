import LoginClient from "./page"

export default function LoginServer({ searchParams }: { searchParams: { message: string } }) {
  return (
    <>
    <LoginClient searchParams={searchParams}/>
    </>

  )
}