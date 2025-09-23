import { getSongs } from "@/lib/folj";
import { FC } from "react";
import SongCarousel from "./song.carousel";

const Songs: FC<{
  title: string;
}> = async ({ title }) => {
  const songsList = await getSongs();
  const songs = songsList?.songs || [];
  
  return (
    <SongCarousel
      songs={songs}
      title={title}

    
    />
  );
};

export default Songs;
