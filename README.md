# GP7 Token

This project is an education example of a simple Token (called GP7) realized on IC Blockchain.

To deploy locally ensure you installed dfx cli, then run
```
dfx start --clean
```
then open another terminal and run
```
dfx deploy
```

After the deploy, you principal will have 1000000000 GP7 tokens assigned.

You can get your principal running
```
dfx identity get-principal
```

At this point you can start playing with the faucet.

The first thing you have to do is to transfer an amount of GP7 from your principal wallet to the faucet canister.
You can do this with
```
dfx canister call token transfer "(principal \"$( \dfx canister id token )\", 500_000_000)"
```

Now if you try to click "Gimme Gimme", 10000 GP7 will be moved from the faucet canister to the anonymous user who's running in the frontend (since you are not logged in).

You can check the balance of your principal, the faucet canister, and the anoymous user.

You can also try to transfer GP7s between these wallets.

## Authentication with Internet Identity
The DApp is ready to use Dfinity's Internet Identity, but to effectively use this you have to deploy the DApp on live env.

To enable the authentication, uncomment the lines in
- index.jsx
- Faucet.jsx

## TODOs
These are some errors in the code, I just wanted to learn basis of motoko language and never thinked to deploy this on live env, so I never worried to do this perfectly

- If you try to run your frontend with `npm run start`, it won't load the css. I don't know why this is happening, probably because I migrated this project from dfinity 0.9.x to 0.12.1 and I missed some configurations.
- Transfer function is not working with authentication, since I just wanted to learn basis of motoko language and never thinked to deploy this on live env
- You need to manually move tokens from your principal wallet to the canister, this can be automated for sure


# Original README
This is repository has been created following a course on Udemy, here below you can find the original README

# Check your Balance

1. Find out your principal id:

```
dfx identity get-principal
```

2. Save it somewhere.

e.g. My principal id is: gbdev-tyqsv-hnvqv-7mgz4-4kcfl-wbv6x-6khez-y56gq-uohqs-quomc-uqe


3. Format and store it in a command line variable:
```
OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""
```

4. Check that step 3 worked by printing it out:
```
echo $OWNER_PUBLIC_KEY
```

5. Check the owner's balance:
```
dfx canister call token balanceOf "( $OWNER_PUBLIC_KEY )"
```

# Charge the Canister

1. Check canister ID:
```
dfx canister id token
```

2. Save canister ID into a command line variable:
```
CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token )\""
```

3. Check canister ID has been successfully saved:
```
echo $CANISTER_PUBLIC_KEY
```

4. Transfer half a billion tokens to the canister Principal ID:
```
dfx canister call token transfer "($CANISTER_PUBLIC_KEY, 500_000_000)"
```

# Deploy the Project to the Live IC Network

1. Create and deploy canisters:

```
dfx deploy --network ic
```

2. Check the live canister ID:
```
dfx canister --network ic id token
```

3. Save the live canister ID to a command line variable:
```
LIVE_CANISTER_KEY="principal \"$( \dfx canister --network ic id token )\""
```

4. Check that it worked:
```
echo $LIVE_CANISTER_KEY
```

5. Transfer some tokens to the live canister:
```
dfx canister --network ic call token transfer "($LIVE_CANISTER_KEY, 50_000_000)"
```

6. Get live canister front-end id:
```
dfx canister --network ic id token_assets
```
7. Copy the id from step 6 and add .raw.ic0.app to the end to form a URL.
e.g. zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app