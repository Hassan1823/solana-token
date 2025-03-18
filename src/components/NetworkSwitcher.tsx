import { FC } from "react";
import dynamic from "next/dynamic";

// internal imports
import { useNetworkConfiguration } from "../contexts/NetworkConfigurationProvider";
// import NetworkSwitcher from "./SVG/NetworkSwitcherSVG";
import NetworkSwitcherSVG from "../components/SVG/NetworkSwitcherSVG";

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } =
    useNetworkConfiguration();
  return (
    <>
      <input type="checkbox" id="checkbox" />
      <label className="switch">
        <select
          value={networkConfiguration}
          onChange={(e) => setNetworkConfiguration(e.target.value || "devnet")}
          className="bg-transparent border-none select max-w-s outline-0"
        >
          <option value="mainnet-beta">main</option>
          <option value="devnet">dev</option>
          <option value="testnet">test</option>
        </select>
      </label>
    </>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), {
  ssr: false,
});
