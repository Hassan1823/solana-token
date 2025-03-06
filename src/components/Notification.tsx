import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import useNotificationStore from "../stores/useNotificationStore";
import { useConnection } from "@solana/wallet-adapter-react";
import { useNetworkConfiguration } from "../contexts/AutoConnectProvider";

//* internal imports
import NotificationSVG from "./SVG/NotificationSVG";
import { clearInterval } from "timers";

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s
  );

  const reversedNotifications = [...notifications].reverse();
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-20 flex items-end px-4  py-6 sm:p-6`}
    >
      <div className={`flex w-full flex-col`}>
        {reversedNotifications?.map((n, idx) => (
          <Notification
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Notification = ({ type, message, description, txid, onHide }) => {
  const { connection } = useConnection();
  const { networkConfiguration } = useNetworkConfiguration();

  useEffect(() => {
    const id = setTimeout(() => {
      onHide();
    }, 8000);

    return () => {
      clearInterval(id);
    };
  }, [onHide]);

  return (
    <div className="bg-bkg-1 pointer-events-auto z-50 mx-4 mt-2 mb-12 w-full max-w-sm overflow-hidden rounded-md bg-[#0a1023] p-2 shadow-lg ring-1">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === "success" ? (
              <CheckCircleIcon className="w-8 h-8 mr-1 text-success" />
            ) : null}
            {type === "info" ? (
              <InformationCircleIcon className="w-8 h-8 mr-1 text-info" />
            ) : null}
            {type === "error" ? (
              <XCircleIcon className="w-8 h-8 mr-1 text-error" />
            ) : null}
          </div>

          <div className="flex-1 w-0 ml-2">
            <div className="font-bold text-fgd-1">{message}</div>
            {description ? (
              <p className="text-fgd-2 mt-0.5 text-sm ">{description}</p>
            ) : null}

            {txid ? (
              <div className="flex flex-row">
                <a
                  href={
                    `http://explorer.solana.com/tx/` +
                    txid +
                    `?cluster=${networkConfiguration}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-row link-accent link"
                >
                  <NotificationSVG />
                  <div className="flex mx-4">
                    {txid.slice(0, 8)}....
                    {txid.slice(txid.length - 8)}
                  </div>
                </a>
              </div>
            ) : null}
          </div>

          <div className="flex self-start flex-shrink-0 ml-4">
            <button
              onClick={() => onHide()}
              className="inline-flex rounded-md bg-bkg-2 default-transition text-fgd-3 hover:text-fgd-4 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
