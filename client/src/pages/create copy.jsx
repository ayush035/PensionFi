import React, { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { Navbar, Footer, } from "../components";

import {
  marketplaceAddress
} from "../config";

import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ name: "", description: "" });
  // const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      );
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function uploadToIPFS() {
    const { name, description } = formInput;
    if (!name || !description || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    // const price = ethers.utils.parseUnits(formInput.price, 'ether')
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    const transaction = await contract.createToken(url, { value: listingPrice });
    await transaction.wait();

    // router.push("/explore");
  }

  return (
    <div className="w-full gradient-bg-welcome">
      <Navbar />
      <div className="text-4xl text-center text-white font-bold mt-10 mb-20">
        <h1> Account Creation Page </h1>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12 ">
          <input
            placeholder="Asset Name"
            className="mt-8 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <textarea
            placeholder="Asset Description"
            className="mt-2 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
          />
          <input
            placeholder="Asset Price in MATIC"
            className="mt-2 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
          />
          <input
            type="file"
            name="Asset"
            className="my-4 mb-8"
            onChange={onChange}
          />
          <br />
          <div>
            {
          fileUrl && (
            <image
              className="rounded mt-4"
              src={fileUrl}
              frameBorder="0"
              // scrolling="auto"
              height="100%"
              width="100%"
            />
          )
        }
          </div>
          <button type="button" onClick={listNFTForSale} className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
            Create NFT
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
