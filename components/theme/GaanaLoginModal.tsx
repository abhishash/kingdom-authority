// components/GaanaLoginModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BookOpenText } from "lucide-react";
import AppImage from "../ui/appImage";

export default function GaanaLoginModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-2xl border-none">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Login Options */}
          <div className="border-r-2 border-0 border-solid flex flex-col justify-center items-center p-8">
            {/* <Image src="" alt="Gaana" width={100} height={40} className="mb-4" /> */}
            <div className="flex items-center gap-1">
              <BookOpenText className="size-10 stroke-red-600" />
              <h1 className="text-lg font-bold text-red-600">Victorious's Song</h1>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center">
              Listen to Gaana Non-Stop
            </h2>
            <p className="text-sm text-gray-400 mb-6">Quick Sign In Options</p>
            <Button className="w-full bg-white text-black hover:bg-gray-200 mb-3">
              Continue with Google
            </Button>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
              <span className="flex-grow border-t border-gray-600"></span>
              <span>Or Sign in With</span>
              <span className="flex-grow border-t border-gray-600"></span>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Continue with Phone/Email ID
            </Button>
            <p className="text-xs text-center mt-6 text-gray-500">
              By proceeding, you agree to our{" "}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline">
                Terms of Services
              </Link>
              .
            </p>
          </div>

          {/* Right Side: Illustration */}
          <div className=" flex flex-col justify-center items-center p-8">
            <h3 className="text-xl font-bold mb-4 text-center">
              Over 30 million songs to suit every mood & occasion
            </h3>
            <AppImage
              src=""
              alt="Music Girl"
              width={250}
              height={250}
              className="mb-6"
            />
            <div className="flex justify-around w-full">
              <div className="flex flex-col items-center">
                <span>🎵</span>
                <p className="text-sm mt-2 text-center">
                  Create your own Playlist
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span>🔗</span>
                <p className="text-sm mt-2 text-center">
                  Share music with family and friends
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span>❤️</span>
                <p className="text-sm mt-2 text-center">Save your favourites</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
