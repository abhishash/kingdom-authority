import Songs from "@/components/songs";
import { getSong } from "@/lib/folj";
import { isObject } from "@/lib/type-guards";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const songInfo = await getSong(decodeURIComponent(slug));

  return (
    <Suspense fallback={null}>
      {isObject(songInfo?.data) ? <Songs song={songInfo?.data} /> : null}
    </Suspense>
  );
}
