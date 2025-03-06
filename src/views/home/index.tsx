import { FC } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// internal imports
import pkg from "../../../package.json";

export const HomeView: FC = ({ setOpenCreateModel }) => {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-[72px]">
      <div className="px-6 py-4">
        <div className="bg-default-950/40 rounded-2xl">
          <div className="container">
            <div className="p-6">
              <div className="relative grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                {/* <div className="bg-primary/10 -z-1 start-0 absolute top-0 h-14 w-14 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none"></div> */}
                <div className="absolute bottom-0 rounded-full bg-primary/20 -z-1 end-0 h-14 w-14 animate-ping"></div>

                {/* left side section */}
                <div className="">
                  <span className="z-10 px-3 py-1 text-sm font-medium tracking-wider uppercase rounded-md text-primary bg-primary/20">
                    CREATE SOLANA TOKEN {pkg.version}
                  </span>
                  <h1 className="max-w-lg my-4 text-4xl font-medium text-white capitalize md:text-5xl">
                    Now Create Solana Token To Without Code
                  </h1>
                  <p className="capitalize text-default/300 md:text-lg">
                    Launch your Solana Token, All in one Solana token
                    development and deployment
                  </p>

                  <div className="new_add_css">
                    <a
                      onClick={() => setOpenCreateModel(true)}
                      className="inline-flex items-center justify-center gap-2 px-1 py-1 mt-10 text-white transition-all duration-300 border rounded-full pe-4 hover:bg-primary-hover group border-white/10"
                    >
                      <span className="flex items-center justify-center rounded-full bg-primary/20 text-primary me-2 h-11 w-11 group-hover:bg-white/10 group-hover:text-white">
                        <i data-lucide="image" className="">
                          <MdGeneratingTokens />
                        </i>
                      </span>
                      Create
                    </a>

                    <a className="mt-8">
                      <WalletMultiButton />
                    </a>
                  </div>
                </div>

                {/* right side section */}
                <div className="mx-auto h-[595px] overflow-hidden ">
                  <div className="grid grid-cols-2 gap-6 marquee ">
                    {/* left images slider */}
                    <div className="relative flex flex-col gap-6 m-auto overflow-hidden">
                      {/* first slider */}
                      <div className="flex flex-col items-center justify-around flex-shrink-0 min-h-full gap-6 marquee-hero">
                        {["img-6", "img-7", "img-8", "img-9", "img-10"].map(
                          (image, index) => (
                            <img
                              key={index}
                              src={`assets/images/ai/${image}.jpg`}
                              alt={image}
                              className="object-cover h-40 aspect-1 w-60 rounded-xl"
                            />
                          )
                        )}
                      </div>

                      {/* second slider */}
                      <div
                        aria-hidden="true"
                        className="flex flex-col items-center justify-around flex-shrink-0 min-h-full gap-6 marquee-hero"
                      >
                        {["img-11", "img-12", "img-13", "img-14", "img-21"].map(
                          (image, index) => (
                            <img
                              key={index}
                              src={`assets/images/ai/${image}.jpg`}
                              alt={image}
                              className="object-cover h-40 aspect-1 w-60 rounded-xl"
                            />
                          )
                        )}
                      </div>
                    </div>

                    {/* right images slider */}
                    <div className="flex flex-col gap-6 m-auto overflow-hidden marquee-reverse ">
                      {/* first slider */}
                      <div className="flex flex-col items-center justify-around flex-shrink-0 min-h-full gap-6 marquee-hero">
                        {["img-6", "img-10", "img-11", "img-12", "img-13"].map(
                          (image, index) => (
                            <img
                              key={index}
                              src={`assets/images/ai/${image}.jpg`}
                              alt={image}
                              className="object-cover h-40 aspect-1 w-60 rounded-xl"
                            />
                          )
                        )}
                      </div>

                      {/* second slider */}
                      <div
                        aria-hidden="true"
                        className="flex flex-col items-center justify-around flex-shrink-0 min-h-full gap-6 marquee-hero"
                      >
                        {["img-9", "img-14", "img-21", "img-22", "img-10"].map(
                          (image, index) => (
                            <img
                              key={index}
                              src={`assets/images/ai/${image}.jpg`}
                              alt={image}
                              className="object-cover h-40 aspect-1 w-60 rounded-xl"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeView;
