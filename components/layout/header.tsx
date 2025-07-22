"use client";
import { useState } from "react";
import Navbar from "./nav-bar";
import Link from "next/link";
import {  UserIcon } from "lucide-react";
import { SongSearch } from "../theme/song-search";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import Logo from "../theme/logo";
import LoginModal from "../theme/login-modal";

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const navClass = "text-sm font-medium tracking-wide hover:text-red-600 hover:font-bold transition-colors text-zinc-800 duration-100";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:px-16 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Navbar />
          <Logo />
        </div>
        <nav className="hidden md:flex gap-6 ">
          <Link
            href="/"
            className={navClass}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={navClass}
          >
            About
          </Link>
          <Link
            href="/lyrics"
            className={navClass}
          >
            Lyrics
          </Link>
          <Link
            href="/songs"
            className={navClass}
          >
            Songs
          </Link>
          <Link
            href="/image-gallery"
            className={navClass}
          >
            Image Gallery
          </Link>
        </nav>
        <div className="flex items-center gap-0.5 md:gap-4">
          <SongSearch />
          <ModeToggle />
          <Button
            variant="ghost"
            className="block md:hidden"
            onClick={() => setModalOpen(true)}
          >
            <UserIcon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer md:block hidden"
            onClick={() => setModalOpen(true)}
          >
            Login / Sign Up
          </Button>
          <LoginModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
      </div>
    </header>
  );
}

export default Header;
