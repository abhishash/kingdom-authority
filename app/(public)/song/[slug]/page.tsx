import { SongSearch } from "@/components/theme/song-search";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      {/* If you use useSearchParams() in SongSearch, wrap it in Suspense */}
      <SongSearch />
      <h1>My Post: main pag</h1>
    </Suspense>
  );
}