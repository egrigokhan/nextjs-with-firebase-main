import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/core";
import "firebase/auth";
import { React, useEffect, useRef, useState } from "react";
import { useAPI } from "../context/APIContext";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useStudio } from "../context/StudioContext";
import firebaseClient from "../firebaseClient";
import NavbarLogin from "./NavbarLogin";
import "firebase/auth";
import firebase from "firebase";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import TaglineImage from "../assets/tagline-image.png";

import Head from "next/head";

export default function Login() {
  const { studioState, currentRoomIndex } = useStudio();
  const { isInPreview } = useRoomDesign();
  var content = useRef(null);

  const [state, setState] = useState(studioState);

  const [roomIndex, setRoomIndex] = useState(0);

  const [pricePackage, setPricePackage] = useState("killer_monthly");
  firebaseClient();
  const toast = useToast();
  const [walletAddress, setWalletAddress] = useState("");
  const [customURL, setCustomURL] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const { createUser } = useAPI();

  useEffect(() => {
    if (pricePackage != "killer_monthly" && pricePackage != "killer_annually") {
      setCustomURL("bunny-time");
    }
  }, [pricePackage]);
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
      <Head>
        <title>Shil.me | Join</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavbarLogin style={{ zIndex: "-2 !important" }} />
      <img src={TaglineImage} style={{ width: "70%", maxWidth: "700px" }} />
      {false && (
        <p
          style={{
            fontFamily: "DM Serif Text",
            fontSize: "72px",
            marginTop: "0px"
          }}
        >
          So ahead of the curve it looks like a line
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          right: "32px",
          bottom: "32px"
        }}
      >
        <span
          onClick={async () => {
            if (window.ethereum) {
              const accounts = await window.ethereum
                .request({ method: "eth_requestAccounts" })
                .catch((e) => {
                  console.error(e.message);
                  return;
                });
              if (!accounts) {
                return;
              }

              window.userWalletAddress = accounts[0];
              setWalletAddress(window.userWalletAddress);
            } else {
              setStatusMessage({
                type: "No ethereum connection.",
                message: "You don't have Metamask."
              });
            }
          }}
          style={{
            backgroundColor: "rgb(41, 41, 42, 0.07)",
            fontFamily: "Inter",
            fontWeight: "regular",
            fontSize: "13px",
            border: "none",
            padding: "8px",
            borderRadius: "8px",
            color: "black",
            marginBottom: "8px",
            display: "inline-block",
            padding: "8px 16px",
            cursor: "pointer",
            color: "black",
            fontWeight: walletAddress ? "regular" : "bold",
            textAlign: "center"
          }}
        >
          {walletAddress ? walletAddress : "Connect your wallet"}
        </span>
        <span
          style={{
            backgroundColor: "rgb(41, 41, 42, 0.07)",
            fontFamily: "Inter",
            fontWeight: "regular",
            fontSize: "13px",
            border: "none",
            borderRadius: "8px",
            color: "black",
            marginBottom: "8px",
            display: "flex",
            flexDirection: "row",
            padding: "0px 16px",
            cursor: "pointer",
            color: "black"
          }}
        >
          <b style={{ color: "black", fontWeight: "bold", margin: "8px 0px" }}>
            shil.me/
          </b>
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
            placeholder="your custom url"
            value={customURL}
            disabled={
              pricePackage != "killer_monthly" &&
              pricePackage != "killer_annually"
            }
            onChange={(e) => {
              setCustomURL(e.target.value);
            }}
          ></input>
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "4px"
          }}
        >
          <input
            type="checkbox"
            checked={pricePackage == "chiller"}
            onChange={() => {
              setPricePackage("chiller");
            }}
            style={{ marginRight: "8px", display: "flex" }}
          />
          <div style={{ flexDirection: "column", display: "flex" }}>
            <span
              style={{ fontSize: 12, fontFamily: "Inter", fontWeight: "bold" }}
            >
              Chiller Shiller (Free)
            </span>
            <span style={{ fontSize: 12, fontFamily: "Inter" }}>
              For small-time NFT enthusiasts
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "4px"
          }}
        >
          <input
            type="checkbox"
            checked={pricePackage == "killer_monthly"}
            onChange={() => {
              setPricePackage("killer_monthly");
            }}
            style={{
              marginRight: "8px",
              display: "flex",
              background: "green",
              backgroundColor: "green"
            }}
          />
          <div style={{ flexDirection: "column", display: "flex" }}>
            <span
              style={{ fontSize: 12, fontFamily: "Inter", fontWeight: "bold" }}
            >
              Killer Shiller ($9/monthly with FREE 7-day trial)
            </span>
            <span style={{ fontSize: 12, fontFamily: "Inter" }}>
              For those who are in it to win it
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "8px"
          }}
        >
          <input
            type="checkbox"
            checked={pricePackage == "killer_annually"}
            onChange={() => {
              setPricePackage("killer_annually");
            }}
            style={{ marginRight: "8px", display: "flex" }}
          />
          <div style={{ flexDirection: "column", display: "flex" }}>
            <span
              style={{ fontSize: 12, fontFamily: "Inter", fontWeight: "bold" }}
            >
              Killer Shiller ($90/annually with FREE 7-day trial)
            </span>
            <span style={{ fontSize: 12, fontFamily: "Inter" }}>
              For those who are in it to win it
            </span>
          </div>
        </div>
        {statusMessage && (
          <p
            style={{
              marginBottom: "16px",
              fontFamily: "Inter",
              fontWeight: "bold",
              fontSize: "10px",
              marginTop: "8px",
              textAlignment: "right"
            }}
          >
            {statusMessage.href ? (
              <span>
                You're already shilling at{" "}
                <a href={statusMessage.href}>shil.me{statusMessage.href}</a>
              </span>
            ) : (
              statusMessage.message
            )}
          </p>
        )}
        <button
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
                    const json = await res.json();
                    setStatusMessage(json);
                    if (json.success) {
                      window.location.href = `/${customURL}`;
                    }
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
            cursor: "pointer",
            float: "right"
          }}
        >
          {"Join with"}{" "}
          {<FontAwesomeIcon onClick={() => {}} icon={faTwitter} />}
        </button>
      </div>
    </div>
  );
}
