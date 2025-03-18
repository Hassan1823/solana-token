import React, { FC } from "react";
import { LuArrowRightFromLine } from "react-icons/lu";
import { MdGeneratingTokens, MdToken } from "react-icons/md";
import { RiTokenSwapFill } from "react-icons/ri";
import { RxTokens } from "react-icons/rx";

export const FeatureView: FC = ({
  setOpenAirdrop,
  setOpenContact,
  setOpenCreateModel,
  setOpenSendTransaction,
  setOpenTokenMetaData,
}) => {
  const features = [
    {
      name: "Token Generator",
      icon: <MdGeneratingTokens />,
      description:
        "Start working with Solana token generator, It allow you to create solana token by creating, deploying, airdrop, transferring and updating token",
      function: setOpenCreateModel,
    },
    {
      name: "Get Airdrop",
      icon: <MdToken />,
      description:
        "Start working with Solana token generator, It allow you to create solana token by creating, deploying, airdrop, transferring and updating token",
      function: setOpenAirdrop,
    },
    {
      name: "Transfer Sol",
      icon: <RiTokenSwapFill />,
      description:
        "Start working with Solana token generator, It allow you to create solana token by creating, deploying, airdrop, transferring and updating token",
      function: setOpenSendTransaction,
    },
    {
      name: "Transfer Metadata",
      icon: <RxTokens />,
      description:
        "Start working with Solana token generator, It allow you to create solana token by creating, deploying, airdrop, transferring and updating token",
      function: setOpenTokenMetaData,
    },
  ];
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-medium text-white capitalize">
              Choose Solana Blockchain generator
            </h2>
            <p className="text-sm font-medium text-bg-default-200">
              Now you can create Solana token <br />
              to without code instantly
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center bg-default-950/40 rounded-3xl backdrop-blur-3xl">
          {features.map((list, idx) => (
            <div
              key={idx}
              className={`w-auto grow border-b border-white/10 md:w-1/2 ${
                idx == 0
                  ? "md:border-e"
                  : idx == 1
                  ? ""
                  : idx == 2
                  ? "md:border-e md:border-b-0"
                  : ""
              }`}
            >
              <div className="p-8 sm:p-10">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-10 bg-primary/10 text-primary rounded-xl">
                  <i className="" data-lucide="farmer">
                    {list.icon}
                  </i>
                </div>
                <h2 className="mb-4 text-2xl font-medium text-white">
                  {list.name}
                </h2>
                <p className="mb-6 text-base text-default-200">
                  {list.description}
                </p>
                <a
                  onClick={() => list.function(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 text-white transition-all duration-300 border rounded-full hover:bg-primary border-white/10"
                >
                  Use Tools
                  <i className="">
                    <LuArrowRightFromLine />
                  </i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
