import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import * as React from "react";
import {  X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import HtmlRender from "./html-render";
import { SongTypes } from "@/lib/folj/types";

const QuickView = ({
  data: song,
  open,
  setOpen,
}: {
  data: SongTypes;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <AlertDialog open={open} defaultOpen={false} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-[92%] md:max-w-[40%] p-1 rounded-xl bg-gray-300/80 dark:bg-black">
        <AlertDialogHeader className="bg-white dark:bg-neutral-950 rounded-xl ">
          <AlertDialogTitle className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center absolute top-2 right-2 rounded-sm py-1.5 text-sm px-2 mr-2 bg-white dark:bg-neutral-900 cursor-pointer border border-solid"
            >
              <X className="size-4 stroke-gray-500 stroke-2 group-hover:stroke-red-800" />{" "}
            </button>
            <h2 className="text-lg mt-8 text-center uppercase bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              {song?.songTitle}
            </h2>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <ScrollArea className="h-48 md:h-72  px-3">
              <div
                // ref={lyricsRef}
                className="w-full flex flex-col gap-y-6 items-center mt-0 print:mt-8 justify-center"
              >
                <HtmlRender htmlContent={song?.songLyrics} />
                {/* ✅ Static content always included in print */}
                <div className="mt-8 text-center text-gray-600 text-sm print:block hidden">
                  <p>──────────</p>
                  <p>Printed from Worship Songs App 🎵</p>
                  <p>© 2025 All Rights Reserved</p>
                </div>
              </div>
            </ScrollArea>
            
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuickView;
