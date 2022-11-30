import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { server } from "../index";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Button,
  Text,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("bdt");

  const currencySymbol =
    currency === "bdt" ? "৳" : currency === "eur" ? "€" : "$";
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(132).fill(1);
  useEffect(() => {
    const fatchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fatchCoins();
  }, [currency, page]);
  if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p="8">
            <HStack spacing={"4"} justifyContent={"space-evenly"}>
              <Radio value={"bdt"}>৳BDT</Radio>
              <Radio value={"eur"}>€EUR</Radio>
              <Radio value={"usd"}>$USD</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                name={i.name}
                img={i.image}
                price={i.current_price}
                url={i.url}
                symbol={i.symbol}
                key={i.id}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflow="auto" p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackSlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "৳" }) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={"52"}
      shadow="lg"
      p={"8"}
      borderRadius="lg"
      transition={"all 0.3s"}
      m="4"
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image src={img} w="10" h={"10"} objectFit="contain" alt="Exchange" />
      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol} ${price}` : "Na"}</Text>
    </VStack>
  </Link>
);

export default Coins;
