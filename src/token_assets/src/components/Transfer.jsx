import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";


function Transfer() {

  const [isDisabled, setDisabled] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isHidden, setHidden] = useState(true);

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  
  async function handleClick() {
    setHidden(true);
    setDisabled(true);
    const principal = Principal.fromText(recipient);
    const amountToTransfer = Number(amount);
    const result = await token.transfer(principal, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
