"use client";
import { useState } from "react";
import Navbar from "./nav-bar";
import Link from "next/link";
import {  BookOpenText } from "lucide-react";
import { SongSearch } from "../theme/song-search";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import GaanaLoginModal from "../theme/GaanaLoginModal";

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:px-16 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Navbar />
          <Link href="/" className="flex items-center gap-2">
            {/* <MobileNav /> */}
            <BookOpenText className="size-8 stroke-red-600" />
            <span className="font-bold text-xl font- text-red-500 md:block hidden">
              Kingdom <br /> Authority
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-lg  font-semibold text-black-500 duration-300 hover:text-black underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-lg font-semibold text-black-500 duration-300 hover:text-black underline-offset-4"
          >
            About
          </Link>
          <Link
            href="/lyrics"
            className="text-lg font-semibold text-black-500 duration-300 hover:text-black underline-offset-4"
          >
            Lyrics
          </Link>
          <Link
            href="/song"
            className="text-lg font-semibold text-black-500 duration-300 hover:text-black underline-offset-4"
          >
            Songs
          </Link>
          <Link
            href="/songs"
            className="text-lg font-semibold text-black-500 duration-300 hover:text-black underline-offset-4"
          >
            Image Gallery
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <SongSearch />
          <ModeToggle />
          <Button variant="ghost" className="cursor-pointer" onClick={() => setModalOpen(true)}>Login / Sign Up</Button>
          <GaanaLoginModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
      </div>
    </header>
  );
}

export default Header;
