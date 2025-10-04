import Songs from "@/components/admin/songs/songs";

const Page = async () => {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <Songs />
    </div>
  );
};

export default Page;
