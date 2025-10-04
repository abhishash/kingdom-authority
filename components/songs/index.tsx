"use client";

import { SongTypes } from "@/lib/folj/types";
import { FC, useRef } from "react";
import BannerSlider from "../theme/banner-slider";
import HtmlRender from "../theme/html-render";
import { isArray } from "@/lib/type-guards";
import clsx from "clsx";
import AppImage from "../ui/appImage";
import { PLACEHOLDER_IMG } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Copy, Printer } from "lucide-react";
import { formatToMonthYear, getInitials } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";
import { CommentSection } from "./comment-section";
import { Card } from "../ui/card";

const Songs: FC<{ song: SongTypes }> = ({ song }) => {
  const handleCopy = () => {
    if (song?.songLyrics) {
      // Strip HTML tags before copying
      const tempElement = document.createElement("div");
      tempElement.innerHTML = song.songLyrics;
      const plainText = tempElement.innerText;
      navigator.clipboard.writeText(plainText);
      alert("Lyrics copied to clipboard!");
    }
  };

  const lyricsRef = useRef(null);

  // ✅ New API: pass contentRef
  const handlePrint = useReactToPrint({
    contentRef: lyricsRef,
    documentTitle: song?.songTitle,
  });

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
          className="rounded-lg overflow-hidden"
        />
      ) : (
        <AppImage
          src={PLACEHOLDER_IMG}
          alt="song image profile"
          isFill
          className={clsx(
            "w-full h-[60vh] md:h-[80vh] overflow-hidden",
            "w-full max-h-[30vh] object-fill group:hover:scale-105 cursor-pointer md:max-h-[70vh] rounded-lg overflow-hidden"
          )}
          priority={true} // preload the first image
        />
      )}
      {/* Add your song components here */}
      <div className="flex gap-x-8 my-6">
        <div className="flex basis-[70%] flex-col items-center px-4 py-12  my-6 rounded-lg bg-gradient-to-tr from-yellow-400/10 via-white/10 to-purple-600/10 relative overflow-hidden">
          {/* Title + Action Buttons */}
          <div className="absolute right-4 top-4">
            <button
              onClick={handleCopy}
              className="p-2 rounded-full hover:bg-gray-200 transition"
              title="Copy Lyrics"
            >
              <Copy size={24} className="text-neutral-600" />
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-full hover:bg-gray-200 transition"
              title="Print Lyrics"
            >
              <Printer size={24} className="text-neutral-600" />
            </button>
          </div>

          {/* Lyrics Section (printable) */}
          <div
            ref={lyricsRef}
            className="w-full flex flex-col gap-y-6 items-center mt-0 print:mt-8 justify-center"
          >
            <h2 className="text-3xl uppercase bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              {song?.songTitle}
            </h2>
            <HtmlRender htmlContent={song?.songLyrics} />
            {/* ✅ Static content always included in print */}
            <div className="mt-8 text-center text-gray-600 text-sm print:block hidden">
              <p>──────────</p>
              <p>Printed from Worship Songs App 🎵</p>
              <p>© 2025 All Rights Reserved</p>
            </div>
          </div>
        </div>
        <div className=" mt-6 basis-[30%] ">
          <h2 className="text-lg font-semibold tracking-wide">Related Songs</h2>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={`${true ? " mt-3" : "mb-6"}`}>
              <Card className="p-2 bg-card">
                <div className="flex gap-0 flex-col">
                  <h2 className="text-base font-semibold  bg-gradient-to-br from-blue-500 to-red-600 bg-clip-text text-transparent leading-relaxed mb-1">
                    Aatma Re, Aatma re,
                  </h2>
                  <div className="flex gap-x-2">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={"/placeholder.svg"} alt="User Avatar" />
                      <AvatarFallback>
                        {" "}
                        AK
                        {/* {comment.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")} */}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="gap-2 mb-2">
                        <h4 className="font-semibold text-sm text-foreground">
                          Abhishek KUmar
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          25 Jun, 2001
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/professional-author-headshot.jpg" alt="Author" />
            <AvatarFallback> {getInitials(song.postBy)} </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-1">
            <p className="font-semibold">{song.postBy}</p>
            <p className="text-sm text-muted-foreground">
              {formatToMonthYear(song.createdAt)}
            </p>
          </div>
        </div>
      </div>
      {/* </div> */}
      <CommentSection />
    </div>
  );
};

export default Songs;
