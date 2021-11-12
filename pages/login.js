import { useToast } from "@chakra-ui/core";
import "firebase/auth";
import { React, useState } from "react";
import Login from "../components/Login";
import { APIProvider, useAPI } from "../context/APIContext";
import { OpenSeaProvider } from "../context/OpenSeaContext";
import { RoomDesignProvider } from "../context/RoomDesignContext";
import { StudioProvider } from "../context/StudioContext";
import firebaseClient from "../firebaseClient";

export default function LoginPage({ props }) {
  firebaseClient();
  const toast = useToast();
  const [walletAddress, setWalletAddress] = useState("");
  const [customURL, setCustomURL] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const { createUser } = useAPI();

  return (
    <APIProvider>
      <StudioProvider state={props}>
        <OpenSeaProvider>
          <RoomDesignProvider>
            <Login />
          </RoomDesignProvider>
        </OpenSeaProvider>
      </StudioProvider>
    </APIProvider>
  );
}
