import { FC } from "react";
import { LuMenu } from "react-icons/lu";
import NetworkSwitcher from "./NetworkSwitcher";

export const AppBar: FC = (props) => {
  const menu = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "Tools",
      link: "#tools",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Price",
      link: "#price",
    },
    {
      name: "FAQ",
      link: "#faq",
    },
  ];

  return (
    <div>
      <header id="navbar-sticky" className="navbar">
        <div className="container ">
          <nav>
            {/* logo */}
            <a href="/" className="logo">
              <img src="assets/images/logo1.png" alt="logo" className="h-10" />
            </a>

            <div className="ms-auto flex items-center px-2.5 lg:hidden">
              {/* mobile menu button */}
              <button
                className="inline-flex items-center justify-center w-12 border rounded-md hs-collapse-toggle bg-default-100/5 h-9 border-white/20"
                type="button"
                data-hs-collapse="#mobileMenu"
                data-hs-type="collapse"
              >
                <i data-lucide="menu" className="stroke-white">
                  <LuMenu />
                </i>
              </button>
            </div>
            {/* display menu */}
            <div
              className="items-center justify-center hidden mx-auto mt-2 transition-all duration-300 hs-collapse grow basis-full lg:mt-0 lg:flex lg:basis-auto"
              id="mobileMenu"
            >
              <ul id="navbar-navlist" className="navbar-nav">
                {menu.map((list, index) => (
                  <li className="nav-item" key={index}>
                    <a href={list.link} className="nav-link">
                      {list.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <NetworkSwitcher />
          </nav>
        </div>
      </header>

      {props.children}
    </div>
  );
};
