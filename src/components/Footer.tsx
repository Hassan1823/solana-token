import React, { FC } from "react";
import { useForm } from "@formspree/react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";

export const Footer: FC = () => {
  const [state, handleSubmit] = useForm("mzbnzpqr");

  if (state.succeeded) {
    return (
      <h1 className="max-w-lg my-4 text-4xl font-medium text-white md:text-5xl/tight">
        Thanks for sending your message! 💖
      </h1>
    );
  }

  const menuOne = [
    "Support Center",
    "Customer Support",
    "About Us",
    "Project",
    "Return Policy",
  ];
  const menuTwo = [
    "Press Inquiries",
    "Social Media Support",
    "Image & B-roll",
    "Site Map",
  ];

  return (
    <footer className="bg-default-950/40 backdrop-blur-3xl">
      <div className="container py-20 lg:px-20 ">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* footer menu 1 */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ul className="flex flex-col gap-3">
              <h5 className="mb-2 font-medium text-default-200 lg:text-lg xl:text-xl">
                About Us
              </h5>
              {menuOne.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-base transition-all text-default-300 hover:text-white"
                  >
                    <i
                      data-lucide="gauge-circle"
                      className="inline-block w-4 h-4 me-2 "
                    ></i>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* footer menu 2 */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ul className="flex flex-col gap-3 ">
              <h5 className="mb-2 font-medium text-default-200 lg:text-lg xl:text-xl">
                My Account
              </h5>

              {menuTwo.map((item, index) => (
                <li className="" key={index}>
                  <a
                    href="#"
                    className="text-base transition-all text-default-300 hover:text-white"
                  >
                    <i
                      data-lucide="gauge-circle"
                      className="inline-block w-4 h-4 me-2 "
                    ></i>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-6 ">
            <div className="bg-primary/20 rounded-xl">
              <div className="p-10">
                <h6 className="mb-4 text-xl text-white">NewsLetter</h6>
                <p className="mb-6 text-base font-medium text-default-200">
                  Signup and receive the latest tips 🚀
                </p>

                {/* news letter  */}
                <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                  <label htmlFor="email" className="text-base text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full h-12 py-4 text-white rounded-lg bg-default-950/60 pe-40 ps-4 border-white/10 backdrop-blur-3xl focus:border-white/10 focus:ring-0"
                    />

                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="hover:bg-primary-hover hover:border-primary-hover border-primary bg-primary end-[6px] absolute top-[6px] inline-flex h-9 items-center justify-center gap-2 rounded-md px-6 text-white transition-all"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>

                {/* social icons */}
                <div className="">
                  <h6 className="mb-4 text-base text-white">Follow Us</h6>
                  <ul className="flex flex-wrap items-center gap-1">
                    {[
                      <TiSocialFacebook />,
                      <TiSocialLinkedin />,
                      <TiSocialTwitter />,
                      <TiSocialFacebook />,
                    ].map((social, idx) => (
                      <li className="" key={idx}>
                        <a
                          href="#"
                          className="inline-flex items-center justify-center w-10 h-10 transition-all duration-500 border rounded-lg hover:bg-primary group border-white/10"
                        >
                          <i
                            data-lucide="facebook"
                            className="text-default-300 group-hover:text-white"
                          >
                            {social}
                          </i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* copy right section */}
      <div className="py-6 border-t border-white/10">
        <div className="container flex flex-wrap items-center justify-center h-full gap-4 text-center md:text-start md:justify-between lg:px-20">
          <p className="text-base font-medium text-default-400">
            @ SolanaAI -
            <a href="#" className="">
              {" "}
              Design & Created{" "}
              <i
                data-lucide="heart"
                className="inline w-4 h-4 text-red-500 fill-red-500 "
              >
                ❤{" "}
              </i>
              by @hassan1823
            </a>
          </p>

          <p className="text-base font-medium text-default-400 ">
            Terms Conditions & Policy
          </p>
        </div>
      </div>
    </footer>
  );
};
