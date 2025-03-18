import React, { FC } from "react";

const Branding: FC = ({ image, title, message }) => {
  return (
    <div className="hidden py-4 ps-4 lg:block">
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <img
          src={`assets/images/ai/${image}.jpg`}
          alt="banner image"
          className="w-full h-full transform -scale-x-100"
        />

        <div className="absolute inset-0 bg-default-950/40">
          <div className="flex items-end justify-center h-full">
            <div className="p-6 text-start ">
              <h5 className="mb-3 text-xl font-bold text-white">
                Solana Token Creator <br />
                {title}
              </h5>
              <p className="text-base font-medium text-default-400">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
