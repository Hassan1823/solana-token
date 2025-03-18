import React, { FC, useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  PROGRAM_ID,
  createCreateMetadataAccountInstruction,
  createCreateMetadataAccountV3Instruction,
  createMetadataAccountArgsV3Beet,
} from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { notify } from "../../utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";

// * UI imports
import { AiOutlineClose } from "react-icons/ai";
import CreateSVG from "../../components/SVG/CreateSVG";
import Branding from "../../components/Branding";
import { InputView } from "../input/index";

export const CreateView: FC = ({ setOpenCreateModel }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  // state variables
  const [tokenUri, setTokenUri] = useState("");
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState({
    name: "",
    symbol: "",
    decimals: "",
    amount: "",
    image: "",
    description: "",
  });
  console.log("🐱‍👤✨ ~ token:", token);

  const handleFormFieldChange = (fieldName, e) => {
    setToken({
      ...token,
      [fieldName]: e.target.value,
    });
  };

  // create token function
  const createToken = useCallback(
    async (token) => {
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        publicKey
      );

      try {
        const metadataUrl = await uploadMetadata(token);
        console.log("🐱‍👤✨ ~ createToken ~ metadataUrl:", metadataUrl);

        const createMetadataInstruction =
          createCreateMetadataAccountV3Instruction(
            {
              metadata: PublicKey.findProgramAddressSync(
                [
                  Buffer.from("metadata"),
                  PROGRAM_ID.toBuffer(),
                  mintKeypair.publicKey.toBuffer(),
                ],
                PROGRAM_ID
              )[0],
              mint: mintKeypair.publicKey,
              mintAuthority: publicKey,
              payer: publicKey,
              updateAuthority: publicKey,
            },
            {
              createMetadataAccountArgsV3: {
                data: {
                  name: token.name,
                  symbol: token.symbol,
                  uri: metadataUrl,
                  creators: null,
                  sellerFeeBasisPoints: 0,
                  uses: null,
                  collection: null,
                },
                isMutable: false,
                collectionDetails: null,
              },
            }
          );

        const createNewTokenTransaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMintInstruction(
            mintKeypair.publicKey,
            Number(token.decimals),
            publicKey,
            publicKey,
            TOKEN_PROGRAM_ID
          ),
          createAssociatedTokenAccountInstruction(
            publicKey,
            tokenATA,
            publicKey,
            mintKeypair.publicKey
          ),
          createMintToInstruction(
            mintKeypair.publicKey,
            tokenATA,
            publicKey,
            Number(token.amount) * Math.pow(10, Number(token.decimals))
          ),
          createMetadataInstruction
        );

        const signature = await sendTransaction(
          createNewTokenTransaction,
          connection,
          {
            signers: [mintKeypair],
          }
        );

        setTokenMintAddress(mintKeypair.publicKey.toString());
        notify({
          type: "success",
          message: "Token Created Successfully",
          txid: signature,
        });
      } catch (error: any) {
        console.log(error);
        notify({ type: "error", message: "Token Creation Error" });
      }

      setIsLoading(false);
    },
    [publicKey, connection, sendTransaction]
  );

  // image upload function IPFS
  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const imgUrl = await uploadImagePinata(file);
      console.log("🐱‍👤✨ ~ handleImageChange ~ imgUrl:", imgUrl);
      setToken({
        ...token,
        image: imgUrl,
      });
    }
  };

  // function to upload image
  const uploadImagePinata = async (file) => {
    console.log("🐱‍👤✨ ~ uploadImagePinata ~ file:", file);
    if (file) {
      // setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "17e532d1d209b209f540",
            pinata_secret_api_key:
              "fb4af1b7cf69f8d79273e9f70e918fe1a5f7c99ec14e12ebe59df1526fc93804",
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log("🐱‍👤✨ ~ uploadImagePinata ~ response:", response);
        return ImgHash;
      } catch (error) {
        console.log("🐱‍👤✨ ~ uploadImagePinata ~ error:", error);
        notify({ type: "error", message: "Image Upload Error" });
      }

      setIsLoading(false);
    }
  };

  // upload metadata
  const uploadMetadata = async (token) => {
    setIsLoading(true);
    const { name, symbol, description, image } = token;
    if (!name || !symbol || !description || !image) {
      return notify({ type: "error", message: "Token data is missing" });
    }

    const data = JSON.stringify({
      name: name,
      symbol: symbol,
      description: description,
      image: image,
    });

    // uploading the data
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: "17e532d1d209b209f540",
          pinata_secret_api_key:
            "fb4af1b7cf69f8d79273e9f70e918fe1a5f7c99ec14e12ebe59df1526fc93804",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${process.env.REACT_APP_PINATA_API_KEY}`,
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      return url;
    } catch (error: any) {
      console.log("🐱‍👤✨ ~ uploadMetadata ~ error:", error);
      notify({ type: "error", message: "Pinata Upload JSON Error" });
    }

    setIsLoading(false);
  };
  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]">
          <ClipLoader />
        </div>
      )}

      {!tokenMintAddress ? (
        <section className="flex items-center w-full px-0 py-6 lg:h-screen lg:p-10">
          <div className="container">
            <div className="max-w-5xl mx-auto overflow-hidden bg-default-950/40 rounded-2xl backdrop-blur-2xl ">
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="hidden py-4 pt-10 ps-4 lg:block">
                  <div className="relative w-full overflow-hidden upload rounded-xl ">
                    {token.image ? (
                      <img src={token.image} alt="token" className="w-2/5" />
                    ) : (
                      <label htmlFor="file" className="custum-file-upload">
                        <div className="icon">
                          <CreateSVG />
                        </div>
                        <div className="text">
                          <span className="">Click to upload image</span>
                        </div>

                        <input
                          type="file"
                          id="file"
                          onChange={handleImageChange}
                          className=""
                        />
                      </label>
                    )}
                  </div>

                  <textarea
                    rows={6}
                    onChange={(e) => handleFormFieldChange("description", e)}
                    className="border-default-200 relative mt-48 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                    placeholder="Description of your token"
                  ></textarea>
                </div>

                <div className="flex flex-col p-10 lg:ps-0">
                  <div className="pb-6 my-auto">
                    <h4 className="mb-4 text-2xl font-bold text-white">
                      Solana Token Creator
                    </h4>
                    <p className="max-w-sm mb-8 capitalize text-default-300">
                      Kindly provide all the details about your token
                    </p>

                    <div className="text-start">
                      <InputView
                        name="Name"
                        placeholder="name"
                        clickhandle={(e) => handleFormFieldChange("name", e)}
                      />
                      <InputView
                        name="Symbol"
                        placeholder="symbol"
                        clickhandle={(e) => handleFormFieldChange("symbol", e)}
                      />
                      <InputView
                        name="Decimal"
                        placeholder="decimal"
                        clickhandle={(e) => handleFormFieldChange("decimal", e)}
                      />
                      <InputView
                        name="Amount"
                        placeholder="amount"
                        clickhandle={(e) => handleFormFieldChange("amount", e)}
                      />

                      <div className="mb-6 text-center ">
                        <button
                          onClick={() => createToken(token)}
                          className="inline-flex items-center justify-center w-full px-6 py-2 mt-5 text-white transition-all duration-500 rounded-lg bg-primary-600/90 hover:bg-primary-600 group backdrop-blur-2xl"
                          type="submit"
                        >
                          <span className="fw-bold">Create Token</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="text-center ">
                      <ul className="flex flex-wrap items-center justify-center gap-2">
                        <li className="">
                          <a
                            onClick={() => setOpenCreateModel(false)}
                            className="inline-flex items-center justify-center w-10 h-10 transition-all duration-500 rounded-lg cursor-pointer group bg-white/20 backdrop-blur-2xl hover:bg-blue-600/6"
                          >
                            <i className="text-2xl text-white group hover:text-white">
                              <AiOutlineClose />
                            </i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex items-center w-full px-0 py-6 lg:h-screen lg:p-10">
          <div className="container">
            <div className="max-w-5xl mx-auto overflow-hidden bg-default-950/40 rounded-2xl backdrop-blur-2xl ">
              <div className="grid gap-10 lg:grid-cols-2">
                {/* first section  */}
                <Branding
                  image="auth-img"
                  title="To Build Your Solana Creator"
                  message="Try and Create your first ever solana project, and if you want to master blockchain development then check the course"
                />

                {/* second section  */}
                <div className="lg;ps-0 flex h-full flex-col p-10 ">
                  <div className="pb-10">
                    <a className="flex">
                      <img
                        src="assets/images/logo1.png"
                        alt="logo"
                        className="h-10"
                      />
                    </a>
                  </div>

                  <div className="pb-6 my-auto text-center">
                    <h4 className="mb-4 text-2xl font-bold text-white">
                      Link to your new token
                    </h4>
                    <p className="max-w-sm mx-auto mb-5 capitalize text-default-300">
                      Your Solana Token is successfully created, Check now on
                      explorer
                    </p>

                    <div className="flex items-center justify-center">
                      <img
                        src={token.image || "assets/images/logo1.png"}
                        alt="token img"
                        className="h-40 "
                      />
                    </div>

                    <div className="w-full mt-5 text-center">
                      <p className="text-base font-medium leading-6 text-default-300">
                        <InputView
                          name={"Token Address"}
                          placeholder={tokenMintAddress}
                        />

                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            navigator.clipboard.writeText(tokenMintAddress)
                          }
                        >
                          Copy
                        </span>
                      </p>

                      <div className="mb-6 text-center ">
                        <a
                          href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center w-full px-6 py-2 mt-5 text-white transition-all duration-500 rounded-lg bg-primary-600/90 hover:bg-primary-600 group backdrop-blur-2xl"
                        >
                          <span className="fw-bold">View on Solana</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
