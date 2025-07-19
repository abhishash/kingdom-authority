import {  SongTypes } from "@/lib/folj/types";
import { FC } from "react";
import BannerSlider from "../theme/banner-slider";
import HtmlRender from "../theme/html-render";
import TitleProps from "../theme/title-props";

const Songs: FC<{ song: SongTypes }> = ({ song }) => {
  return (
    <div className="container mx-auto px-4 my-12 md:px-0">
      <BannerSlider
        images={song?.images}
        className="w-full max-h-[30vh] object-fill group:hover:scale-105 cursor-pointer md:max-h-[70vh] rounded-2xl overflow-hidden"
      />
      {/* Add your song components here */}
      <div className="grid grid-cols-4 px-2 my-12">
        <div className="col-span-1">
          <TitleProps title="More Explore Song"  />
        </div>
        <div className="flex col-span-3 flex-col gap-4 justify-center items-center px-4">
          <h1 className="text-3xl uppercase ">{song?.songTitle}</h1>
          <p>Key Code : # {song.keyCode}</p>
          <HtmlRender htmlContent={song.songLyrics} />
          <div className="flex flex-col items-start w-full">
            <p>Author Name : # {song.authorName}</p>
            <p>Posted By: {song.postBy}</p>
            <p>Created By: {song.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Songs;
