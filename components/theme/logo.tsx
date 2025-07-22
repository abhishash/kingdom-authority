import { BookOpenText } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      {/* <MobileNav /> */}
      <BookOpenText className="size-8 stroke-red-600 stroke-[1.5]" />
      <span className="font-semibold leading-4 italic text-xs text-red-500 md:block hidden">
        Kingdom&apos;s <br /> Authority
      </span>
    </Link>
  );
};

export const MobileLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      {/* <MobileNav /> */}
      <BookOpenText className="size-8 stroke-red-600 stroke-[1.5]" />
      <span className="font-semibold leading-4 italic text-xs text-red-500">
        Kingdom &apos;s <br /> Authority
      </span>
    </Link>
  );
};
export default Logo;
