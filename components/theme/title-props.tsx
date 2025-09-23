import { FC } from "react";

const TitleProps: FC<{
  title: string;
  description?: string;
}> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-center w-full">
        {/* Slanted label */}
        <div className="flex-1 border-y h-1 block md:hidden border-gray-200"></div>
          <div className="bg-gradient-to-r from-blue-500 to-red-600 bg-clip-text text-transparent text-base md:text-xl font-extrabold italic">
            <h2 className="text-3xl">  {title} </h2>
          </div>
      </div>
      <h2 className="text-center text-sm font-poppins">{description}</h2>
    </div>
  );
};

export default TitleProps;
