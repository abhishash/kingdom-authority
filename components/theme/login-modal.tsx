"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AudioLines, HeartIcon, LinkIcon } from "lucide-react";
import AppImage from "../ui/appImage";
import { MobileLogo } from "./logo";

export default function LoginModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  return (
    <Dialog open={open} defaultOpen={false} onOpenChange={onOpenChange}>
      <DialogContent className=" max-w-[360px] max-h-[60vh] md:min-h-max overflow-scroll md:overflow-hidden md:min-w-2xl border-none">
        <DialogHeader>
          <DialogTitle className="text-red-600">
            Kingdom &apos;s Authority
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Login Options */}
          <div className="border-none md:border-r-2 border-0 md:border-solid backdrop-blur-lg bg-white/60 flex flex-col gap-y-6 md:py-8 py-2 items-center">
            <MobileLogo />
            <div className="px-3">
              <h2 className="text-2xl text-slate-900 font-bold mb-2 text-center">
                Listen your Father
              </h2>
              <p className="text-sm text-gray-400 mb-6 text-center">
                Quick Sign In Options
              </p>
              <Button
                variant="secondary"
                className="w-full mb-2 cursor-pointer"
              >
                Continue with Google
              </Button>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <span className="flex-grow border-t border-zinc-300"></span>
                <span>Or Sign in With</span>
                <span className="flex-grow border-t border-zinc-300"></span>
              </div>
              <Button className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white">
                Continue with Phone/Email ID
              </Button>
              <p className="text-xs text-center mt-4 md:mt-16 text-gray-500">
                By proceeding, you agree to our{" "}
                <Link href="/cms/policy" className="underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/cms/term-and-service" className="underline">
                  Terms of Services
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Right Side: Illustration */}
          <div className=" flex flex-col justify-center items-center py-2 md:p-4">
            <h3 className="text-xl font-bold mb-4 text-center">
              Over 30 million songs to your seed{" "}
            </h3>
            <AppImage
              src=""
              alt="Music Girl"
              width={280}
              height={280}
              className="mb-6 rounded-lg"
            />
            <div className="flex justify-around w-full pt-2">
              <div className="flex flex-col items-center">
                <AudioLines className="stroke-sky-600" />
                <p className="text-sm mt-2 text-center text-black justify-center">
                  Create your own Playlist
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <LinkIcon />
                <p className="text-sm mt-2 text-center text-black">
                  Share music with family and friends
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <HeartIcon className="fill-red-600 stroke-red-600 size-5" />
                <p className="text-sm mt-2 text-center text-black">
                  Save your favourites
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
