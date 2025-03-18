import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

// * internal imports
import {
  HomeView,
  AirDropView,
  ContactView,
  CreateView,
  DonateView,
  FaqView,
  FeatureView,
  InputView,
  OfferView,
  TokenMetaData,
  ToolView,
} from "../views";

const Home: NextPage = (props) => {
  // state variable
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [openTokenMetaData, setOpenTokenMetaData] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openAirdrop, setOpenAirdrop] = useState(false);
  const [openSendTransaction, setOpenSendTransaction] = useState(false);

  return (
    <>
      <Head>
        <title>Solana Token Creator</title>
        <meta
          name="Solana Token Creator"
          content="build and create solana tokens"
        />
      </Head>

      <HomeView setOpenCreateModel={setOpenCreateModel} />

      <ToolView
        setOpenAirdrop={setOpenAirdrop}
        setOpenContact={setOpenContact}
        setOpenCreateModel={setOpenCreateModel}
        setOpenSendTransaction={setOpenSendTransaction}
        setOpenTokenMetaData={setOpenTokenMetaData}
      />

      <FeatureView
        setOpenAirdrop={setOpenAirdrop}
        setOpenContact={setOpenContact}
        setOpenCreateModel={setOpenCreateModel}
        setOpenSendTransaction={setOpenSendTransaction}
        setOpenTokenMetaData={setOpenTokenMetaData}
      />
      <OfferView />
      <FaqView />

      {/* dynamic components */}
      {/* {openCreateModel && (
        <div className="relative h-full new_loader bg-slate-900">
          <CreateView setOpenCreateModel={setOpenCreateModel} />
        </div>
      )}

      {openTokenMetaData && (
        <div className="relative h-full new_loader bg-slate-900">
          <TokenMetaData setOpenTokenMetaData={setOpenTokenMetaData} />
        </div>
      )}

      {openContact && (
        <div className="relative h-full new_loader bg-slate-900">
          <ContactView setOpenContact={setOpenContact} />
        </div>
      )}

      {openAirdrop && (
        <div className="relative h-full new_loader bg-slate-900">
          <AirDropView setOpenAirdrop={setOpenAirdrop} />
        </div>
      )}

      {openSendTransaction && (
        <div className="relative h-full new_loader bg-slate-900">
          <DonateView setOpenSendTransaction={setOpenSendTransaction} />
        </div>
      )} */}
    </>
  );
};

export default Home;
