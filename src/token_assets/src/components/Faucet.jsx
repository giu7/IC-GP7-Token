import React, { useState } from "react";
import { AuthClient } from "@dfinity/auth-client"; 
import { token, canisterId, createActor } from "../../../declarations/token";

function Faucet() {

  const [isDisabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Gimme Gimme');

  async function handleClick(event) {
    setDisabled(true);

    // UNCOMMENT these lines to enable authenticated payOut -- work only on live env
    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // const authCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity
    //   }
    // });

    // const resultText = await authCanister.payOut();

    //COMMENT this line if you want to enable authentication -- work onli on live env
    const resultText = await token.payOut();
    setButtonText(resultText);
    //setDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free GP7 tokens here! Claim 10,000 GP7 tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
