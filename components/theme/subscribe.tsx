"use client";
import Image from "next/image";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import fetchHandler from "@/utils/fetcher";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

const subscribe = {
  name: "Jesus Says.",
  description:
    "Because he loves me,” says the LORD, “I will rescue him; I will protect him, for he acknowledges my name.",
  heading: "Jesus Says",
  image: "/images/image1.jfif",
};

const Subscribe = () => {
  const { register, handleSubmit } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: (data: FieldValues) =>
      fetchHandler({
        url: "/subscribe",
        method: "POST",
        queryKey: "/subscribe",
        body: data,
      }),
    onSuccess: (data) => {
      const { message, success } = data;
      if (success) {
        toast.success(message);
      } else {
        toast.warning(message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: FieldValues) => {
    await mutateAsync(data);
  };

  return (
    <div className="my-12">
      <div className="relative flex flex-col md:flex-row isolate bg-gray-100/60 dark:bg-neutral-900 rounded-lg overflow-hidden py-0">
        <div className="relative min-w-[30rem] md:block hidden">
          <Image
            className="object-center"
            src={subscribe?.image}
            alt="jesus-verus"
            fill={true}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-red-500">
              {subscribe?.name}{" "}
            </h2>
            <p className="md:mt-4 mt-2 text-sm md:text-lg text-black dark:text-white">
              {subscribe?.description}
            </p>
            <Badge variant="default">Psalam 91:14</Badge>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:mt-6 mt-4 flex-col flex w-full md:max-w-xl gap-2"
            >
              <div className="flex flex-col md:flex-row gap-2">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                  placeholder="First Name"
                  className="w-full border md:max-w-max flex-auto rounded-md bg-white/5 px-2  md:px-3.5 md:py-2 py-1.5  text-gray-600 font-medium outline-1 text-sm -outline-offset-1 outline-gray-900 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500  md:min-w-xs"
                />
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
                  })}
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full border md:max-w-max flex-auto rounded-md bg-white/5 px-2  md:px-3.5 md:py-2 py-1.5  text-gray-600 font-medium outline-1 text-sm -outline-offset-1 outline-gray-900 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 md:min-w-xs"
                />
              </div>
             
              <button
                type="submit"
                className="text-white font-bold bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 tracking-wide rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-fit cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
