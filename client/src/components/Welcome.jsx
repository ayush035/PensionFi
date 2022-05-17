import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import logo1 from "../assets/logowhite2.png";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const Welcome = () => {
  const { currentAccount, connectWallet } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white py-1">
            PensionFi <br /> Retire Smart <br /> Retire Well
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the world of web3 pension investment. Choose where to invest and see you retirement fund grow.
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-80 sm:w-120 w-3/4 my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-20 h-20 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={61} color="#000" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-xl">
                  {shortenAddress(currentAccount)}
                </p>
                <br />
                <p className="text-white font-semibold text-2xl mt-1">
                  Ethereum Address of PensionFi User
                </p>

              </div>
            </div>
          </div>

        </div>

        <div className="md:flex-[0.5] flex-initial justify-center items-center mt-50">
          <img src={logo1} alt="welcome" className="w-100 cursor-pointer mt-20 pt-20" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
