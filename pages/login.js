import React, { useState } from "react";
import Link from "next/link";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Stack,
  Button,
  Heading,
  useToast
} from "@chakra-ui/core";

import { APIProvider, useAPI } from "../context/APIContext";

export default function Login({ props }) {
  firebaseClient();
  const toast = useToast();
  const [walletAddress, setWalletAddress] = useState("");
  const [customURL, setCustomURL] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const { createUser } = useAPI();

  return (
    <APIProvider>
      <div>
        <input
          value={walletAddress}
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
        ></input>
        <input
          value={customURL}
          onChange={(e) => {
            setCustomURL(e.target.value);
          }}
        ></input>
        <button
          minWidth="40%"
          variant="solid"
          variantColor="blue"
          isDisabled={false}
          onClick={async () => {
            const userCredentials = await firebase
              .auth()
              .signInWithPopup(new firebase.auth.TwitterAuthProvider())
              .then((userCredentials) => {
                console.log("user", { ...userCredentials.user });
                console.log(customURL);
                console.log(walletAddress);
                console.log("here");
                createUser({
                  uid: "123456",
                  customURL: customURL,
                  walletAddress: walletAddress
                })
                  .then(async (res) => {
                    console.log("success");
                    const json = await res.json();
                    setStatusMessage(json.message);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                /*
              firebase
                .firestore()
                .collection("users")
                .doc(userCredentials.user.uid)
                .set(
                  {
                    uid: userCredentials.user.uid,
                    email: userCredentials.user.email,
                    name: userCredentials.user.displayName,
                    provider: userCredentials.user.providerData[0].providerId,
                    photoUrl: userCredentials.user.photoURL,
                    lastSignIn: new Date()
                  },
                  { merge: true }
                )
                .then(() => {
                  // window.location.href = "/";
                });
                */
              })
              .catch((error) => {
                const message = error.message;
                toast({
                  title: "An error occurred.",
                  description: message,
                  status: "error",
                  duration: 9000,
                  isClosable: true
                });
              });
          }}
        >
          Create account
        </button>
        <p>{statusMessage}</p>
      </div>
    </APIProvider>
  );
}
