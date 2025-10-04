"use client";
import DraftEditor from "@/components/Editor/DraftEditor";
import fetchHandler from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import { Controller, FieldValues, useForm } from "react-hook-form";

const EditPage = () => {
  const songId = "67d336186753c0383b7794db";
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: async () =>
      await fetchHandler({
        url: `/admin/song/${songId}`,
        method: "GET",
      }),
  });

  console.log("Fetched song data:", data);

  if (isLoading) return <p>Loading...</p>;

  const onSubmit = async (data: FieldValues) => {
    console.log("Form submitted", data);
  };

  return (
    <div className="flex flex-col w-[80vw] justify-center items-center mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-6 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Lyrics / Description
            </label>
            {/* {watch("songLyrics") ? ( */}
              <Controller
                control={control}
                name="songLyrics"
                render={({ field }) => (
                  <DraftEditor defaultValues={field.value} {...field} />
                )}
              />
            {/* ) : (
              <p>Loading...</p>
            )} */}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Song Title</label>
            <input
              {...register("songTitle", { required: "Song Title is required" })}
              type="text"
              className="input-field"
              placeholder="Enter song title"
            />
            {/* {errors.songTitle && (
              <p className="text-red-500 text-sm">{errors?.songTitle.message}</p>
            )} */}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Song Slug</label>
            <input
              {...register("songSlug", { required: "Song Slug is required" })}
              type="text"
              className="input-field"
              placeholder="Enter song slug"
            />
            {/* {errors.songSlug && (
              <p className="text-red-500 text-sm">{errors.songSlug.message}</p>
            )} */}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Author Name
            </label>
            <input
              {...register("authorName", {
                required: "Author Name is required",
              })}
              type="text"
              className="input-field"
              placeholder="Enter author name"
            />
            {/* {errors.authorName && (
              <p className="text-red-500 text-sm">
                {errors.authorName.message}
              </p>
            )} */}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Key Code</label>
            <input
              {...register("keyCode", { required: "Key Code is required" })}
              type="text"
              className="input-field"
              placeholder="Enter key code"
            />
            {/* {errors.keyCode && (
              <p className="text-red-500 text-sm">{errors.keyCode.message}</p>
            )} */}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Post By</label>
            <input
              {...register("postBy", { required: "Post By is required" })}
              type="text"
              className="input-field"
              placeholder="Enter post by"
            />
            {/* {errors.postBy && (
              <p className="text-red-500 text-sm">{errors.postBy.message}</p>
            )} */}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              YouTube URL
            </label>
            <input
              {...register("youtubeUrl", {
                pattern: {
                  value:
                    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
                  message: "Enter a valid YouTube URL",
                },
              })}
              type="text"
              className="input-field"
              placeholder="Enter YouTube URL"
            />
            {/* {errors.youtubeUrl && (
              <p className="text-red-500 text-sm">
                {errors.youtubeUrl.message}
              </p>
            )} */}
          </div>
        </div>
        <button
          type="submit"
          className="submit-btn"
          //   disabled={mutation.isLoading}
        >
          {" "}
          Submit
          {/* {mutation.isLoading ? "Updating..." : "Submit"} */}
        </button>
      </form>
    </div>
  );
};

export default EditPage;
