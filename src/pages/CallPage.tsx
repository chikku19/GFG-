import { useEffect, useState } from "react";

import {
  huddleIframeApp,
  HuddleAppEvent,
  HuddleIframe,
  IframeConfig,
  HuddleClientMethodName,
} from "@huddle01/huddle01-iframe";
import './WelcomePage.css'

interface CallPageProps {
  closeStream: () => void;
  newStream: () => void;
  iframeConfig: IframeConfig;
}

function CallPage({ closeStream, newStream, iframeConfig }: CallPageProps) {
  useEffect(() => {
    newStream();
  }, [])
  return (
    <div className="WelcomePage">
      <button onClick={() => {
        closeStream();
        }}>Close</button>

      <HuddleIframe config={iframeConfig} />
    </div>
  );
}

export default CallPage;
