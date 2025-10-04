
import Verify from "@/components/verfiy/verify";

const Page = async ({ params }: { params: Promise< { token: string }> }) => {
  const { token } = await params;

  return (
    <Verify token={token} />
  );
};

export default Page;
