import { useEffect, useState } from "react";
import { ethers } from "ethers";

import Logo from "../assets/daolingo_logo.png";

import './RatePage.css'

type RatePageProps = {
  nextStep: (step: number) => void;
  flowRate: string;
  setFlowRate: (flowRate: string) => void;
  setJoinedRoom: (joined: boolean) => void;
};

function RatePage({
  nextStep,
  flowRate,
  setFlowRate,
  setJoinedRoom,
}: RatePageProps) {
  const [flowRateDisplay, setFlowRateDisplay] = useState("");

  function calculateFlowRate(amount: any) {
    const amountInWei = ethers.BigNumber.from(amount);
    const monthlyAmount = Number(ethers.utils.formatEther(amountInWei.toString()));
    const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
    return calculatedFlowRate;
  }

  const handleFlowRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setFlowRate(amount);
    let newFlowRateDisplay = calculateFlowRate(amount);
    setFlowRateDisplay(newFlowRateDisplay.toString());
  };

  const symbol = '$G' // add dropdown with other currencies

  return (
    <div className="RatePage">

      <h2>Set your rate per minute</h2>
      <div>
        <input value={flowRate} onChange={handleFlowRateChange}></input>
        <span className='coin'>{symbol}</span>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => {
        nextStep(2)
        setJoinedRoom(true)
      }}>NEXT</button>
    </div>
  );
}

export default RatePage;
