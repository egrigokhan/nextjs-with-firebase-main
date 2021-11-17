import React from "react";
import NextLink from "next/link";
import { useColorMode, Button, Flex, Box, IconButton } from "@chakra-ui/core";
import styled from "@emotion/styled";

export default function Badge({ children }) {
  return (
    <>
      <Flex
        flexDirection="row"
        style={{
          backgroundColor: "rgba(41, 41, 42, 0.07)",
          display: "inline-block",
          borderRadius: "6px",
          padding: "0px 8px",
          fontWeight: "bold",
          fontSize: "10px",
          marginTop: "6px",
          lineHeight: "20px",
          height: "20px"
        }}
      >
        {children}
      </Flex>
    </>
  );
}
