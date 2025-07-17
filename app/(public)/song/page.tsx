import { Suspense } from "react";

export default async function Page() {
  return <Suspense fallback={null}><h1>My Post: main pag</h1></Suspense> 
}