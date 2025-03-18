import React, { FC } from "react";

const Branding: FC = ({}) => {
  return (
    <div className="hidden py-4 ps-4 lg:block">
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <img
          src={`assets/images/ai/auth-img.jpg`}
          // src={`assets/images/ai/${imageUrl}`}
          alt="banner image"
          className="w-full h-full transform -scale-x-100"
        />

        <div className="absolute inset-0 bg-default-950/40">
          <div className="flex items-end justify-center h-full">
            <div className="p-6 text-start ">
              <h5 className="mb-3 text-xl font-bold text-white">
                Solana Token Creator <br />
                To Build Your Solana Creator
                {/* {title} */}
              </h5>
              <p className="text-base font-medium text-default-400">
                Try and Create your first ever solana project, and if you want
                to master blockchain development then check the course
                {/* {message} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
