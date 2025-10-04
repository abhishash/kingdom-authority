"use client";

import fetchHandler from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";

const Verify =  ({ token }: {  token: string }) => {
  // ------ Query-----//

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () =>
      fetchHandler({
        url: `/admin/verify/${token}`,
        method: "POST",
        queryKey: "/verify",
        body: {},
      }),
    onSuccess: (data) => {
      const { details, success } = data;
      if (success) {
        toast.success(details);
      } else {
        toast.warning(details);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    mutateAsync();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-gradient-to-b from-red-50 via-white to-red-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 px-4">
        <div className="relative">
          <Image
            src="https://68.media.tumblr.com/3802e690377a90e63ed309d157247395/tumblr_olhi6orjbY1ql3nz5o1_1280.gif"
            alt="Error illustration"
            width={300}
            height={300}
            className="rounded-2xl shadow-lg border border-red-100 dark:border-neutral-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-red-600 dark:text-red-400">
          Oops! Something went wrong
        </h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300 max-w-md">
          We encountered an unexpected error while loading this page.
        </p>

        <div className="mt-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-sm px-4 py-2 text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Error Message:</span> {error.message}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
        >
          Retry
        </button>

        <Link
          href="/"
          className="mt-3 text-sm text-red-500 hover:text-red-700 underline transition"
        >
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1000000000000",
        width: "100vw",
        top: "0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        height: "500px",
      }}
    >
      {isPending ? (
        <>
          <Image
            src="https://i.pinimg.com/originals/84/22/0a/84220a2fc13e5f62e5f4da4ee1d15112.gif"
            alt="loading..."
            width={300}
            height={300}
          />
          <h1>Please Wait...</h1>
        </>
      ) : (
        <>
          <Image
            src="https://i.gifer.com/7efs.gif"
            alt="loading..."
            width={300}
            height={300}
          />
          <Link href={"/"}>Login</Link>
        </>
      )}
    </div>
  );
};

export default Verify;
