import { useEffect, useState } from "react";
import "./App.css";
import Logo from "./assets/daolingo_logo.png";

import {
  huddleIframeApp,
  HuddleAppEvent,
  HuddleIframe,
  IframeConfig,
  HuddleClientMethodName,
} from "@huddle01/huddle01-iframe";
import { CreateFlow } from "./components/createFlow";
import WelcomePage from './pages/WelcomePage'
import RatePage from './pages/RatePage'
import CallPage from './pages/CallPage'

import { createNewFlow, deleteExistingFlow } from "./utils";

function App() {
  let account;
  const [currentAccount, setCurrentAccount] = useState("");
  const [roomURL, setRoomURL] = useState("https://app.huddle01.com/ngc-zpep-ofm");
  const [joinRoom, setJoinRoom] = useState(false);
  const [recipient, setRecipient] = useState("0xe11b9F88325114e6B3dCc81cd6867B4926e9Fb62");
  const [flowRate, setFlowRate] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [joinedRoom, setJoinedRoom] = useState(false)
  const iframeConfig: IframeConfig = {
    roomUrl: roomURL,
    height: "600px",
    width: "100%",
  };


  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      account = currentAccount;
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener()
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    console.log("runs");
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    let chainId = chain;
    console.log("chain ID:", chain);
    console.log("global Chain Id:", chainId);
    if (accounts.length !== 0) {
      account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      // setupEventListener()
    } else {
      console.log("No authorized account found");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // huddleIframeApp.on("peer-join", (data: any) => {
  //   console.log('PEER JOIN ', data)
  //   createNewFlow(recipient, flowRate)
  // });

  // huddleIframeApp.on("me-left", (data: any) => {
  //   console.log('ME LEFT ', data)

  //   deleteExistingFlow(recipient)
  // });

  const nextStep = (step) => {
    setCurrentStepIndex(step)
  }
  const newStream = () => {
    createNewFlow(recipient, flowRate)
  }
  const closeStream = () => {
    window.close('','_parent','')
    deleteExistingFlow(recipient)
  }
  const renderHuddleIframe = () =>
    <HuddleIframe config={iframeConfig} />
    

  const currentStep = [
    <WelcomePage
      roomURL={roomURL}
      setRoomURL={setRoomURL}
      nextStep={nextStep}
      connectToHuddle={
        () => {
          
        }
      }
    />,
    <RatePage
      nextStep={nextStep}
      setJoinedRoom={setJoinedRoom}
      flowRate={flowRate}
      setFlowRate={setFlowRate}
      currentAccount={currentAccount}
      connectWallet={connectWallet}
    />,
    <CallPage newStream={newStream} closeStream={() => closeStream()} iframeConfig={iframeConfig} />
    // <CreateFlow
    //       currentAccount={currentAccount}
    //       setCurrentAccount={setCurrentAccount}
    //       recipient={recipient}
    //       setRecipient={setRecipient}
    //       flowRate={flowRate}
    //       setFlowRate={setFlowRate} /> ,
  ]

  console.log('currentStep', currentStep, 'currentStepIndex', currentStepIndex)

  return (
    <div className="App">
      <img src={Logo} width="410" />
      <div className="container">
        {currentStep[currentStepIndex]}
        {/* <HuddleIframe config={iframeConfig} /> */}
        {}
        {/* {joinedRoom && <HuddleIframe config={iframeConfig} />} */}
        {/* <span>
          <input
            type="text"
            value={roomURL}
            onChange={(e: { target: { value: any; }; }) => setRoomURL(e.target.value)}
            placeholder="Room URL"
          />
        </span>

        <input
          type="text"
          value={currentAccount}
          onChange={(e: { target: { value: any; }; }) => setCurrentAccount(e.target.value)}
          placeholder="Wallet Address"
        />

        <button
          onClick={() => {
            huddleIframeApp.methods.connectWallet(currentAccount)
            setJoinRoom(true)
          }}
        >
          Find Teacher
        </button>

        {joinRoom && <HuddleIframe config={iframeConfig} />}
        <CreateFlow
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
          recipient={recipient}
          setRecipient={setRecipient}
          flowRate={flowRate}
          setFlowRate={setFlowRate} /> */}
      </div>
    </div>
  );
}

export default App;
