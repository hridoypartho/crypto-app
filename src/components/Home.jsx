import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import Img from "../assets/bitcoin.jpeg";
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w="full" h={"85vh"}>
      <Image
        filter={"grayscale(1)"}
        w={"full"}
        h="full"
        objectFit={"contain"}
        src={Img}
      />
      <Text
        fontSize={"6xl"}
        textAlign="center"
        fontWeight={"thin"}
        color="whiteAlpha.700"
        mt={"-20"}
      >
        {" "}
        Xcrypto
      </Text>
    </Box>
  );
};

export default Home;
