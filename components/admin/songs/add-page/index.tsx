"use client";
import DraftEditor from "@/components/Editor/DraftEditor";
import { Button } from "@heroui/button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm, Controller, FieldValues } from "react-hook-form";
import FormInput from "../../element/form-input";
import fetchHandler from "@/utils/fetcher";
import { toast } from "sonner";

export function AddSongPage() {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    // formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FieldValues) =>
      fetchHandler({
        url: "/admin/song/create",
        method: "POST",
        queryKey: "create-song",
        body: data,
        isFormData: true,
      }),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("You submitted the following values");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (songData: FieldValues) => {
    const {
      songTitle,
      images,
      songSlug,
      authorName,
      keyCode,
      postBy,
      youtubeUrl,
      songLyrics,
    } = songData;

    const data = new FormData();

    // Append form fields to FormData
    data.append("songTitle", songTitle);
    data.append("songSlug", songSlug);
    data.append("urlKey", songSlug);
    data.append("authorName", authorName);
    data.append("keyCode", keyCode);
    data.append("postBy", postBy);
    data.append("youtubeUrl", youtubeUrl);
    data.append("songLyrics", songLyrics);

    // If images is a file (or multiple files), append it to FormData
    if (images && images.length > 0) {
      Array.from(images).forEach((file) => {
        data.append("images", file as File);
      });
    }

    // Call the mutation function with the FormData object
    await mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between my-6 container">
        <h1 className="text-base font-bold tracking-wider">Add Song</h1>
        <div>
          <Button
            type="submit"
            className="!bg-black text-white !text-sm !px-4 !py-2 tracking-wide hover:bg-gray-800 rounded-md"
            isLoading={isPending}
            spinner={
              <svg
                className="animate-spin h-4.5 w-4.5 text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            }
            // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {" "}
            Submit
          </Button>
          <Button
            type="button"
            className="!bg-red-500 text-white !text-sm !px-4 !py-2 tracking-wide hover:bg-gray-800 rounded-md"
            onPress={() => reset()}
          >
            Reset
          </Button>
          <Button color="default" variant="bordered" className="!border !text-sm rounded-md border-solid border-black" size="md">
            <Link href="/admin/songs">Back</Link>
          </Button>
        </div>
      </div>
      <div className="flex gap-x-6 pt-6">
        <div className="basis-[72%] border-0 border-solid border-r pr-6 border-neutral-300 flex flex-col">
          <div className="w-full my-12">
            <div className="grid gap-6 mb-6 grid-cols-2">
              <FormInput
                name="songTitle"
                control={control}
                label="Song Title"
                type="text"
                placeholder="Enter song title"
                className="py-5 text-base"
                mainWrapper="col-span-2"
                rules={{
                  required: "Song Title is required",
                }}
              />
              <FormInput
                name="songSlug"
                control={control}
                label="Song Slug"
                type="text"
                placeholder="Enter song slug"
                className="py-5 text-base"
                mainWrapper="col-span-2"
                rules={{
                  required: "Song Slug is required",
                }}
              />
              <FormInput
                name="authorName"
                control={control}
                label="Author Name"
                type="text"
                placeholder="Enter Author Name"
                className="py-5 text-base"
                mainWrapper="col-span-2"
                rules={{
                  required: "Song Author Name is required",
                }}
              />

              <FormInput
                name="keyCode"
                control={control}
                label="Key Code"
                type="text"
                placeholder="Enter Key Code"
                className="py-5 text-base"
                mainWrapper="col-span-2"
                rules={{
                  required: "Key Code is required",
                }}
              />

              <FormInput
                name="postBy"
                control={control}
                label="Posted By"
                type="text"
                placeholder="Enter Posted By"
                mainWrapper="col-span-2"
                className="py-5 text-base"
                rules={{
                  required: "Posted By field is required",
                }}
              />
              <FormInput
                name="youtubeUrl"
                control={control}
                label="YouTube URL"
                type="text"
                placeholder="Enter youtube URL"
                className="py-5 text-base"
                mainWrapper="col-span-2"
                rules={{
                  required: "YouTube field is required",
                }}
              />
              <div className="col-span-2">
                <Controller
                  control={control}
                  name="songLyrics"
                  render={({ field }) => <DraftEditor {...field} />}
                />
              </div>
              <input
                type="file"
                multiple={true}
                accept=".png, .jpg, .jpeg"
                className={"mb-5"}
                {...register("images")}
              />
            </div>
          </div>
        </div>
        <div className="basis-[28%]">
          <h1>djakjk</h1>
        </div>
      </div>
    </form>
  );
}
