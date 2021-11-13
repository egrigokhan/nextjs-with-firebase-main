import React from "react";
import nookies from "nookies";
import { verifyIdToken, readRoomForUser } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/core";
import { useAuth } from "../auth";
import App from "../components/App";
import { StudioProvider } from "../context/StudioContext";
import { RoomDesignProvider } from "../context/RoomDesignContext";
import { OpenSeaProvider } from "../context/OpenSeaContext";

function Studio({ props, error }) {
  firebaseClient();
  const { user } = useAuth();
  if (props) {
    return (
      <StudioProvider state={props}>
        <OpenSeaProvider>
          <RoomDesignProvider>
            <App />
          </RoomDesignProvider>
        </OpenSeaProvider>
      </StudioProvider>
    );
  } else {
    if (error) {
      return (
        <Box>
          <Text>{error.message}</Text>
        </Box>
      );
    } else {
      return (
        <Box>
          <Text>loading</Text>
        </Box>
      );
    }
  }
}

export async function getServerSideProps({ req, query, params, ...context }) {
  try {
    console.log("here");
    const cookies = nookies.get({ req, query, params, ...context });
    console.log("token", cookies);
    const token = await verifyIdToken(cookies["firebase-token"]); // await verifyIdToken(cookies.token);

    console.log(req.url);
    const room = await readRoomForUser(token);

    // const { uid, email } = token;
    // This gets called on every request
    // Fetch data from external API
    // const res_ = await fetch(
    //   `https://raw.githubusercontent.com/egrigokhan/dummy-data/main/test-room.json`
    // );
    // const data = await res_.json();

    if (room) {
      console.log("room", room);

      // Pass data to the page via props
      console.log("params", params);
      console.log("room", room);
      return {
        props: {
          props: { ...room, params: { userId: room.custom_url } }
        }
      };
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      };
    }
  } catch (err) {
    return { props: { session: "" } };
  }
}

/*
export async function getServerSideProps(context) {
  try {
    console.log("hey");
    // check if user logged in
    const cookies = nookies.get(context);
    console.log(cookies.token);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;

    // check if path exists
    var db = admin.firestore();
    var data = await db
      .collection("studios")
      .where("customPath", "==", context.params.userId)
      .get();

    console.log("data", data.docs[0].data());

    if (data.docs.length == 0) {
      context.res.writeHead(404, { Location: "/login" });
      context.res.end();
      return { props: {} };
    }

    // check if path belongs to current user
    if (data.docs[0].data().userId == uid) {
      console.log("hey");
      return {
        props: { session: `Your email is ${email} and your UID is ${uid}.` }
      };
    }

    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return { props: {} };
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return { props: {} };
  }
}
*/

export default Studio;
