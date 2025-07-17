"use client";
import Image from "next/image";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import fetchHandler from "@/utils/fetcher";
import { Toaster } from "../ui/sonner";
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const { data, error, isPending, mutate, mutateAsync, reset, status } =
    useMutation({
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
      <div className="relative flex flex-col md:flex-row isolate bg-red-500 rounded-lg overflow-hidden py-0">
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
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
              {subscribe?.name}{" "}
            </h2>
            <p className="md:mt-4 mt-2 text-sm md:text-lg text-white">
              {subscribe?.description}
            </p>
            <Badge variant="secondary">Psalam 91:14</Badge>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:mt-6 mt-4  flex max-w-md gap-x-4"
            >
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
                className="min-w-0 max-w-48 md:max-w-max flex-auto rounded-md bg-white/5 px-2  md:px-3.5 md:py-2 py-1.5  text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="flex-none tracking-wider rounded-md cursor-pointer bg-indigo-500 px-1.5 md:px-3.5 py-0.5  md:py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
