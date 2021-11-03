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

export default function Login({ props }) {
  firebaseClient();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
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
            console.log({ ...userCredentials.user });

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
                window.location.href = "/";
              });
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
  );
}
