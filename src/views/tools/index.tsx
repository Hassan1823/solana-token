import React, { FC } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuArrowRightFromLine } from "react-icons/lu";

export const ToolView: FC = ({
  setOpenAirdrop,
  setOpenContact,
  setOpenCreateModel,
  setOpenSendTransaction,
  setOpenTokenMetaData,
}) => {
  const tools = [
    {
      name: "Create Token",
      icons: <MdGeneratingTokens />,
      function: setOpenCreateModel,
    },
    {
      name: "Token Metadata",
      icons: <MdGeneratingTokens />,
      function: setOpenTokenMetaData,
    },
    {
      name: "Contact Us",
      icons: <MdGeneratingTokens />,
      function: setOpenContact,
    },
    {
      name: "Airdrop",
      icons: <MdGeneratingTokens />,
      function: setOpenAirdrop,
    },
    {
      name: "Send Transaction",
      icons: <MdGeneratingTokens />,
      function: setOpenSendTransaction,
    },
    {
      name: "Buddy Token",
      icons: <MdGeneratingTokens />,
      function: setOpenSendTransaction,
    },
    {
      name: "Top Token",
      icons: <MdGeneratingTokens />,
      function: setOpenSendTransaction,
    },
    {
      name: "Solana Explorer",
      icons: <MdGeneratingTokens />,
      function: setOpenSendTransaction,
    },
  ];

  return (
    <section id="tools" className="py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-10 ">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-medium text-white capitalize">
              Solana Powerful Tools
            </h2>
            <p className="text-sm font-medium text-default-200">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
              sit accusamus inventore recusandae aspernatur fuga consequatur
              non! Est, obcaecati debitis. Inventore omnis ad cupiditate labore
              porro est tenetur a magnam!
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-default-950/40 rounded-xl backdrop-blur-3xl"
              onClick={() => tool.function(true)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 ${
                      index == 0
                        ? "text-red-500"
                        : index == 1
                        ? "text-sky-500"
                        : index == 2
                        ? "text-indigo-500"
                        : index == 3
                        ? "text-yellow-500 "
                        : "text-teal-500"
                    }`}
                  >
                    <i data-lucide="dribble" className="">
                      {tool.icons}
                    </i>
                  </div>

                  <h3 className="text-xl font-medium text-default-200">
                    {tool.name}
                  </h3>
                </div>

                <a className="relative inline-flex items-center gap-2 text-primary group">
                  <span className="absolute w-7/12 h-px transition-all duration-500 rounded bg-primary/80 -bottom-0 group-hover:w-full"></span>
                  Select & Try
                  <i data-lucide={"move-right"} className="">
                    <LuArrowRightFromLine />
                  </i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 ">
          <a className="inline-flex items-center justify-center gap-2 px-6 py-2 text-white transition-all duration-500 rounded-full hover:bg-primary-hover bg-primary">
            More Tools
            <i className="">
              <IoIosArrowRoundForward />
            </i>
          </a>
        </div>
      </div>
    </section>
  );
};
