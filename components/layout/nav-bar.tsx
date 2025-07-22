"use client";

import * as React from "react";
import { Menu,  X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import  { MobileLogo } from "../theme/logo";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

 
  const navClass =
    "text-sm font-medium tracking-wide hover:text-red-600 hover:font-bold transition-colors text-zinc-800 duration-100";

  return (
    <Drawer
      direction="left"
      open={open}
      onOpenChange={setOpen}
      defaultOpen={false}
    >
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer !p-0"
          itemScope={true}
        >
          <Menu className="size-7 stroke-zinc-700" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="!max-w-xs ">
        <div className="mx-auto relative w-full h-full max-w-sm">
          <DrawerHeader className="flex items-center border border-b border-solid justify-between flex-row">
            <DrawerTitle>
              <MobileLogo />
            </DrawerTitle>
            <DrawerDescription>
              <Button
                variant="ghost"
                onClick={() => setOpen(!open)}
                size="sm"
                className="cursor-pointer !bg-white"
              >
                <X />
              </Button>
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center  space-x-2">
              <nav className="flex flex-col gap-4 ">
                <Link href="/" className={navClass}>
                  Home
                </Link>
                <Link href="/about" className={navClass}>
                  About
                </Link>
                <Link href="/lyrics" className={navClass}>
                  Lyrics
                </Link>
                <Link href="/songs" className={navClass}>
                  Songs
                </Link>
                <Link href="/image-gallery" className={navClass}>
                  Image Gallery
                </Link>
              </nav>
            </div>
            <div className="mt-3 h-[120px]"></div>
          </div>
          <DrawerFooter className="absolute bottom-4 w-full border border-t border-solid">
            <DrawerClose asChild>
              <Button variant="outline">Sign In</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
