import RegisterClient from "./page"

export default function RegisterServer({ searchParams }: { searchParams: { message: string } }) {
  return (
    <>
      <RegisterClient searchParams={searchParams}/>
    </>
  )
}