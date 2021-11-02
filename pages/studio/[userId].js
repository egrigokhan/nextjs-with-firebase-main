import React from "react";
import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import firebaseClient from "../../firebaseClient";
import firebase from "firebase/app";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/core";
const admin = require("firebase-admin");

function Studio({ session }) {
  firebaseClient();
  if (session) {
    return (
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as="h2" mb={12} textAlign="center">
            Authenticated
          </Heading>
          <Box>
            <Text textAlign="center">{session}</Text>
            <Text textAlign="center" mt={8}>
              You can now do anything you want in our application.
            </Text>
          </Box>
          <Box my={12} mx="auto" width="500px">
            <Button
              width="100%"
              variant="solid"
              variantColor="red"
              onClick={async () => {
                await firebase.auth().signOut();
                window.location.href = "/";
              }}
            >
              Sign out
            </Button>
          </Box>
        </Box>
      </Flex>
    );
  } else {
    return (
      <Box>
        <Text>loading</Text>
      </Box>
    );
  }
}

export async function getServerSideProps(context) {
  try {
    // check if user logged in
    const cookies = nookies.get(context);
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
export default Studio;
