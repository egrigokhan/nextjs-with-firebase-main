import React from "react";
import { verifyIdToken } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/core";
function Authenticated({ session }) {
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
    console.log("here");
    const cookies = nookies.get(context);
    console.log("token", cookies);
    const token = await verifyIdToken(cookies["firebase-token"]); // await verifyIdToken(cookies.token);
    // Pass data to the page via props
    return {
      props: {
        props: { session: "Hey!" }
      }
    };
  } catch (err) {
    console.log("err", err);
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return { props: { session: "" } };
  }
}
export default Authenticated;
