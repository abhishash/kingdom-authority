import { SongTypes } from "@/lib/folj/types";
import { FC } from "react";
import BannerSlider from "../theme/banner-slider";
import HtmlRender from "../theme/html-render";
import { isArray } from "@/lib/type-guards";
import clsx from "clsx";
import AppImage from "../ui/appImage";
import { PLACEHOLDER_IMG } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
} from "lucide-react";
import { getInitials } from "@/lib/utils";

const Songs: FC<{ song: SongTypes }> = ({ song }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 my-12 md:px-0">
      <div className="flex flex-col gap-y-10 mb-10 ">
        <h1 className="text-3xl uppercase font-serif text-center bg-gradient-to-r from-blue-500 to-red-600 bg-clip-text text-transparent">
          {song?.songTitle}
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="/professional-author-headshot.jpg"
                alt="Author"
              />
              <AvatarFallback> {getInitials(song.authorName)} </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{song.authorName}</p>
              <p className="text-sm text-muted-foreground">
                Senior Developer & Tech Writer
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Dec 15, 2024</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>8 min read</span>
            </div>
          </div>
        </div>
      </div>
      {isArray(song?.images) ? (
        <BannerSlider
          images={song?.images}
          className="w-full max-h-[30vh] object-fill group:hover:scale-105 cursor-pointer md:max-h-[70vh] rounded-2xl overflow-hidden"
        />
      ) : (
        <AppImage
          src={PLACEHOLDER_IMG}
          alt="song image profile"
          isFill
          className={clsx(
            "w-full h-[60vh] md:h-[80vh]  overflow-hidden",
            "w-full max-h-[30vh] object-fill group:hover:scale-105 cursor-pointer md:max-h-[70vh] rounded-xl overflow-hidden"
          )}
          priority={true} // preload the first image
        />
      )}

      {/* Add your song components here */}

      <div className="flex col-span-4 md:col-span-3 order-1 md:order-2 bg-gradient-to-tr from-yellow-400/10 via-white/10 to-purple-600/10 flex-col gap-4 justify-center items-center px-4 py-12 max-w-4xl my-6 mx-auto rounded-2xl relative overflow-hidden">
        <h2 className="text-3xl uppercase bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          {song?.songTitle}
        </h2>
        <HtmlRender htmlContent={song.songLyrics} />
      </div>

      <div className=" w-full">
        <p>Author Name : # {song.authorName}</p>
        <p>Posted By: {song.postBy}</p>
        <p>Created By: {song.createdAt}</p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Songs;
