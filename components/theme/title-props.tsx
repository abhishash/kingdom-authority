import { FC } from "react";

const TitleProps: FC<{
  title: string;
}> = ({ title }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-center w-full">
        {/* Slanted label */}
        <div className="flex-1 border-y h-1 block md:hidden border-gray-200"></div>
        <div className="-skew-x-[30deg] bg-red-500 px-8 py-2 rounded-md shadow-sm">
          <div className="skew-x-[30deg] text-white text-xl font-extrabold italic">
            {title}
          </div>
        </div>

        {/* Horizontal line */}
        <div className="flex-1 border-y h-1  border-gray-200"></div>
      </div>
      <h2 className="text-center text-sm font-poppins">
        The Lord will not allow me stumble; over me dat and night
      </h2>
    </div>
  );
};

export default TitleProps;
