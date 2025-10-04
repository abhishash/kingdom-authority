'use client';
import { useQuery } from "@tanstack/react-query";
import fetchHandler from "@/utils/fetcher";
import { SongsList } from "./songs-list";
const Songs = () => {
  // Fetch songs based on debounced query
  const { data : songsData, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: async () =>
      await fetchHandler({
        url: `/admin/songs`,
        method: "GET",
      }),
  });

  if (isLoading) return <p>Loading...</p>;

  return <SongsList data={songsData?.songs} />;
};

export default Songs;
