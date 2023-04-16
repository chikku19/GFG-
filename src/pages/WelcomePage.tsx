import { useEffect, useState } from "react";

import './WelcomePage.css'

type WelcomePageProps = {
  nextStep: (step: number) => void;
  connectToHuddle: () => void;
  setRoomURL: (url: string) => void;
  roomURL: string;
};

function WelcomePage({ nextStep, connectToHuddle, setRoomURL, roomURL }: WelcomePageProps) {
  return (
    <div className="WelcomePage">

      <h2>Unlock the World</h2>

      <h3>Connect, practice, and Learn Different Languages with Ease</h3>

      { /*<div>
        <input
          type="text"
          value={roomURL}
          onChange={(e: { target: { value: any; }; }) => setRoomURL(e.target.value)}
          placeholder="Room URL"
        />
  </div>*/ }
      <button onClick={() => {
        // connectToHuddle();
        nextStep(1);
        }}>Connect</button>

      <div className="tutor">Connect as tutor</div>

    </div>
  );
}

export default WelcomePage;
