import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={null}>
      <section className="container mx-auto px-4 my-12 md:px-0">
        <h1>My Post: main pag</h1>
      </section>
    </Suspense>
  );
}
