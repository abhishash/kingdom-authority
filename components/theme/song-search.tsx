"use client";

import * as React from "react";
import { CornerDownLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQuery } from "@tanstack/react-query";
import fetchHandler from "@/utils/fetcher";
import { Badge } from "../ui/badge";
import Link from "next/link";
import AppImage from "../ui/appImage";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { SongTypes } from "@/lib/folj/types";
import { isArray } from "@/lib/type-guards";

export function SongSearch() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch songs based on debounced query
  const { data, isLoading } = useQuery({
    queryKey: ["song", debouncedQuery],
    queryFn: async () =>
      await fetchHandler({
        url: `/song/search?q=${debouncedQuery}`,
        method: "GET",
      }),
    enabled: !!debouncedQuery, // only run when query is non-empty
  });

  return (
    <AlertDialog open={open} defaultOpen={false} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer"
          size="icon"
          aria-expanded={open}
          aria-controls="song-search-dropdown"
        >
          <Search className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Search songs</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[92%] md:max-w-[40%] p-1 rounded-xl bg-gray-300/80">
        <AlertDialogHeader className="bg-white rounded-xl ">
          <AlertDialogTitle>
            <div className="flex items-center max-w-full mx-auto p-3">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Search className="size-4 stroke-gray-500" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search branch name..."
                  required
                />
              </div>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <ScrollArea className="h-48 md:h-64  px-3">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4 my-4">
                    <Skeleton className="h-12 w-12 rounded-sm" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px] md:w-[250px]" />
                      <Skeleton className="h-4 w-[150px] md:w-[200px]" />
                    </div>
                  </div>
                ))
              ) : debouncedQuery && isArray(data?.data) ? (
                <ul className="mt-2 space-y-2 max-h-full overflow-auto">
                  {data.data.map((song: SongTypes) => (
                    <li
                      key={song._id}
                      className="text-sm flex gap-x-2 text-gray-800 dark:text-gray-100"
                    >
                      <Link
                        href={`/songs/${song.songSlug}`}
                        className="flex items-center gap-2"
                        onClick={() => setOpen(!open)}
                      >
                        <AppImage
                          src={song?.images?.[0]?.url}
                          alt={song?.images?.[0]?.public_id}
                          isFill
                          className="min-h-12 min-w-15 rounded-sm overflow-hidden"
                        />
                        <div>
                          <h1 className="font-semibold text-sm">
                            {song.songTitle}
                          </h1>
                          <p className="text-gray-500 text-xs font-medium">
                            {song.authorName}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : debouncedQuery ? (
                <div className="mt-10 flex flex-col items-center justify-center
                 text-base text-gray-500">
                  <Search
                    className="size-24
                  "
                  />
                  <p>No matching songs found.</p>
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-400">
                  Type to search Something for you...
                </p>
              )}
            </ScrollArea>
            <div className="flex flex-col gap-y-2 py-2 px-3 items-start jusstify-start">
              <p className="text-gray-400 text-sm font-medium">
                Come to me, all you who are weary and burdened, and I will give
                you rest.
              </p>

              <Badge variant="secondary">Metthew 11:28</Badge>
            </div>
            <div className="bg-gray-200 flex items-center py-1.5 px-4">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center rounded-sm py-1.5 text-sm px-2 mr-2 bg-white cursor-pointer border border-solid"
              >
                <CornerDownLeft className="size-4 stroke-gray-500 stroke-2 group-hover:stroke-red-800" />{" "}
              </button>
              Go Back
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
