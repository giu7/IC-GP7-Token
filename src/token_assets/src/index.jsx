import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client"; 

const init = async () => { 

  const authClient = await AuthClient.create();
  
  //authenticate is skipped, remove 'true ||' to enable it
  if (true || await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        ReactDOM.render(<App />, document.getElementById("root"));
      }
    });
  }
}

async function handleAuthenticated(authClient) {
  // const identity = await authClient.getIdentity();
  // const principal = identity._principal.toString();
  // console.log(principal);

  ReactDOM.render(<App />, document.getElementById("root"));
}

init();


