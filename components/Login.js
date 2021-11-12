import { useToast } from "@chakra-ui/core";
import "firebase/auth";
import { React, useEffect, useRef, useState } from "react";
import { useAPI } from "../context/APIContext";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useStudio } from "../context/StudioContext";
import firebaseClient from "../firebaseClient";
import NavbarLogin from "./NavbarLogin";

export default function Login() {
  const { studioState, currentRoomIndex } = useStudio();
  const { isInPreview } = useRoomDesign();
  var content = useRef(null);

  const [state, setState] = useState(studioState);

  const [roomIndex, setRoomIndex] = useState(0);

  firebaseClient();
  const toast = useToast();
  const [walletAddress, setWalletAddress] = useState("");
  const [customURL, setCustomURL] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const { createUser } = useAPI();
  useEffect(() => {
    console.log(roomIndex);
    console.log("state", state);
  }, [roomIndex, state]);
  return (
    <div
      style={{
        padding: "16px",
        margin: "0px",
        zIndex: "-1 !important",
        backgroundColor: "white"
      }}
    >
      <NavbarLogin style={{ zIndex: "-2 !important" }} />

      <div>
        <input
          style={{
            backgroundColor: "rgb(41, 41, 42, 0.07)",
            fontFamily: "Inter",
            fontWeight: "regular",
            fontSize: "13px",
            border: "none",
            padding: "8px",
            borderRadius: "8px",
            color: "black",
            marginRight: "8px",
            display: "inline-block",
            padding: "8px 16px",
            cursor: "pointer",
            color: "black"
          }}
          placeholder="Wallet address"
        ></input>
        <span></span>
        <span
          style={{
            backgroundColor: "rgb(41, 41, 42, 0.07)",
            fontFamily: "Inter",
            fontWeight: "regular",
            fontSize: "13px",
            border: "none",
            borderRadius: "8px",
            color: "black",
            marginRight: "8px",
            display: "flex",
            flexDirection: "row",
            padding: "0px 16px",
            cursor: "pointer",
            color: "black"
          }}
        >
          <b style={{ color: "black", fontWeight: "bold" }}>shil.me/</b>
          <input
            style={{
              backgroundColor: "rgb(41, 41, 42, 0)",
              fontFamily: "Inter",
              fontWeight: "regular",
              fontSize: "13px",
              border: "none",
              padding: "8px",
              borderRadius: "8px",
              color: "black",
              display: "inline-block",
              padding: "8px 16px",
              cursor: "pointer",
              color: "black"
            }}
            placeholder="custom url"
          ></input>
        </span>
        <button
          onClick={() => {
            console.log("updateStudio");
            updateStudio({ studioState: studioState })
              .then(async (res) => {
                console.log("success changes");
                setUnsavedChanges(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          style={{
            transitionDuration: "0.3s",
            backgroundColor: "rgba(41, 41, 42)",
            fontFamily: "Inter",
            fontWeight: "bold",
            fontSize: "11px",
            border: "none",
            padding: "8px",
            borderRadius: "8px",
            color: "white",
            marginRight: "0px",
            display: "inline-block",
            cursor: "pointer"
          }}
        >
          Login with Twitter
        </button>
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
                  uid: userCredentials.user.uid,
                  custom_url: customURL,
                  wallet_address: walletAddress
                })
                  .then(async (res) => {
                    console.log("success");
                    const json = await res.json();
                    setStatusMessage(json.message);
                  })
                  .catch((err) => {
                    console.log(err);
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
        <p>{statusMessage}</p>
      </div>
    </div>
  );
}
