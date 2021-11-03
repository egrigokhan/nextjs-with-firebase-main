import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "../auth";
import Container from "../components/Container";
import { Flex, Box, Button, Text, Stack, Heading } from "@chakra-ui/core";
export default function Home() {
  const { user } = useAuth();

  return <p>Here!</p>;
}
