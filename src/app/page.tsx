"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as dotenv from "dotenv";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { ethers } from "ethers";
import { Switch } from "antd";
import img1 from "../../public/icons8-internet-50.png";
import img2 from "../../public/icons8-automatic-50.png";
dotenv.config();

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  mainnet,
  polygon,
  fantomTestnet,
  fantom,
  bsc,
} from "wagmi/chains";

export default function Home() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [metaMaskAddress, setMetaMaskAddress] = useState("Address Not Found");

  const deadline = "August, 11, 2023";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  const options = ["APR", "Earned", "Total staked", "Latest"];
  const defaultOption = "Hot";
  // const chains = [arbitrum, mainnet, polygon, fantomTestnet, fantom, bsc];
  // const projectId = "b0787f1586ad8637bb3931d49d2d5e47";

  // const { publicClient } = configureChains(chains, [
  //   w3mProvider({ projectId }),
  // ]);
  // const wagmiConfig = createConfig({
  //   autoConnect: true,
  //   connectors: w3mConnectors({ projectId, chains }),
  //   publicClient,
  // });
  // const ethereumClient = new EthereumClient(wagmiConfig, chains);

  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setMetaMaskAddress(address);
    } else {
      setMetaMaskAddress("MetaMask not detected");
    }
  };

  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/fantom_testnet/"
  );
  const contract = new ethers.Contract(
    "0x571f830C36EAFAe5d11654211636291fa0e460A9",
    '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenRecovered","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminTokenRecovery","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"poolLimitPerUser","type":"uint256"}],"name":"NewPoolLimit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"NewRewardPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"NewStartAndEndBlocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"RewardsStop","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"PRECISION_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SMART_CHEF_FACTORY","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokenPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyRewardWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hasUserLimit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IBEP20","name":"_stakedToken","type":"address"},{"internalType":"contract IBEP20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"},{"internalType":"uint256","name":"_poolLimitPerUser","type":"uint256"},{"internalType":"address","name":"_admin","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLimitPerUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"recoverWrongTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakedToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stopReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalStakedToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasUserLimit","type":"bool"},{"internalType":"uint256","name":"_poolLimitPerUser","type":"uint256"}],"name":"updatePoolLimitPerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"}],"name":"updateStartAndEndBlocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
    provider
  );
  const [FtmEarned, setFtmEarned] = useState("");
  const [totalStaked, setTotalStaked] = useState("");
  const [APR, setAPR] = useState("");

  useEffect(() => {
    const fetchTotalStakedToken = async () => {
      try {
        const totalStakedToken = await contract.bonusEndBlock();
        const totalStakedTokenValue = parseInt(
          totalStakedToken._hex
        ).toString();
        setTotalStaked(totalStakedTokenValue);
        setAPR("3.08%");
        setFtmEarned("2399.00");
      } catch (error) {
        console.error("Error fetching totalStakedToken:", error);
      }
    };
    fetchTotalStakedToken();
  }, []);

  return (
    <>
      {/* <WagmiConfig config={wagmiConfig}></WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
      <div className={styles.Header}>
        <text className={styles.ftmswaptext}>FTM Swap</text>
        <text style={{ fontWeight: "normal" }}>Trade</text>
        <text style={{ fontWeight: "normal" }}>Earn</text>
        <text style={{ fontWeight: "normal" }}>Win</text>
        <text style={{ fontWeight: "normal" }}>NFt</text>
        <Image src={img1} alt="img1"></Image>
        <Image src={img2} alt="img2"></Image>
        <button className={styles.smatChainLayout}>FTM Smart Chain</button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            className={styles.smatChainLayout}
            onClick={() => connectMetamask()}
          >
            Connect MetaMask
          </button>
          <text
            style={{
              fontWeight: "normal",
              marginTop: "20px",
              fontSize: "12px",
            }}
          >
            {metaMaskAddress}
          </text>
        </div>
        {/* <Web3Button /> */}
      </div>
      <main className={styles.main}>
        <div className={styles.syruppoolheader}>
          <text className={styles.syruptext}>Syrup Pools</text>
          <text className={styles.syruptext1}>
            Just stake some tokens to earn. High APR, low risk.
          </text>
        </div>
        <div className={styles.switchMainHead}>
          <div>
            <Switch />
            <text style={{ marginLeft: "15px", fontWeight: "normal" }}>
              Live/Finished
            </text>
          </div>
          <div>
            <Switch />
            <text style={{ marginLeft: "15px", fontWeight: "normal" }}>
              Staked only
            </text>
          </div>
          <Dropdown
            controlClassName={styles.dropDown}
            menuClassName={styles.dropDownMenu}
            options={options}
            // onChange={this._onSelect}
            value={defaultOption}
            placeholder="Select an option"
          />
          <input
            placeholder="Search Pools"
            className={styles.searchPools}
          ></input>
        </div>
        <text
          style={{
            marginTop: "3%",
            marginLeft: "10%",
            color: "red",
            fontWeight: "400",
          }}
        >
          Looking for v1 CAKE syrup pools? Go to migration page.
        </text>
        <div className={styles.mainHead}>
          <div className={styles.mainHead1}>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Earn FTM</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>FTM Earned</text>
              <text className={styles.totalStakedText}>{FtmEarned}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Total Staked</text>
              <text className={styles.totalStakedText}>{totalStaked}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>APR</text>
              <text className={styles.totalStakedText}>{APR}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>End in</text>
              <text
                className={styles.totalStakedText}
              >{`${days}:${hours}:${minutes}:${seconds}`}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Details</text>
            </div>
          </div>
          <div className={styles.mainHead2}>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Earn EDU</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>EDU Earned</text>
              <text className={styles.totalStakedText}>{FtmEarned}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Total Staked</text>
              <text className={styles.totalStakedText}>{totalStaked}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>APR</text>
              <text className={styles.totalStakedText}>{APR}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>End in</text>
              <text
                className={styles.totalStakedText}
              >{`${days}:${hours}:${minutes}:${seconds}`}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Details</text>
            </div>
          </div>
          <div className={styles.mainHead3}>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Earn UNW</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>UNW Earned</text>
              <text className={styles.totalStakedText}>{FtmEarned}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Total Staked</text>
              <text className={styles.totalStakedText}>{totalStaked}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>APR</text>
              <text className={styles.totalStakedText}>{APR}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>End in</text>
              <text
                className={styles.totalStakedText}
              >{`${days}:${hours}:${minutes}:${seconds}`}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Details</text>
            </div>
          </div>
          <div className={styles.mainHead4}>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Earn AXL</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>AXL Earned</text>
              <text className={styles.totalStakedText}>{FtmEarned}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Total Staked</text>
              <text className={styles.totalStakedText}>{totalStaked}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>APR</text>
              <text className={styles.totalStakedText}>{APR}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>End in</text>
              <text
                className={styles.totalStakedText}
              >{`${days}:${hours}:${minutes}:${seconds}`}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Details</text>
            </div>
          </div>
          <div className={styles.mainHead5}>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Earn XCN</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>XCN Earned</text>
              <text className={styles.totalStakedText}>{FtmEarned}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Total Staked</text>
              <text className={styles.totalStakedText}>{totalStaked}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>APR</text>
              <text className={styles.totalStakedText}>{APR}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>End in</text>
              <text
                className={styles.totalStakedText}
              >{`${days}:${hours}:${minutes}:${seconds}`}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Details</text>
            </div>
          </div>
          <div className={styles.mainHead6}>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Earn MGP</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>MGP Earned</text>
              <text className={styles.totalStakedText}>{FtmEarned}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Total Staked</text>
              <text className={styles.totalStakedText}>{totalStaked}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>APR</text>
              <text className={styles.totalStakedText}>{APR}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>End in</text>
              <text
                className={styles.totalStakedText}
              >{`${days}:${hours}:${minutes}:${seconds}`}</text>
            </div>
            <div className={styles.textDiv}>
              <text className={styles.text1}>Details</text>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
