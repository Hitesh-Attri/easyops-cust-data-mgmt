// import Image from "next/image";
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCustomersData } from "./redux/counter";

import { Link } from "@chakra-ui/next-js";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import BASE_URL from "@/BASE_URL";
import Card from "./components/Card";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("Loading...");

  const { dltID, updateID, customersData } = useSelector(
    (state) => state.counter
  );

  useLayoutEffect(() => {
    getAllCustomers();
  }, []);
  const getAllCustomers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get-all-customers`);
      // console.log(res.data);
      // setCustomers(res.data.customers.reverse());
      dispatch(setCustomersData(res.data.customers.reverse()));
      if (res.data.customers.length === 0) {
        setLabel("No customers.");
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    // if (dltID) {
    //   handleDelete(dltID);
    // }
    dltID ? handleDelete(dltID) : null;
  }, [dltID]);

  const handleDelete = (id) => {
    const data = customersData.filter((customer) => customer._id !== id);
    if (data.length === 0) {
    }
    dispatch(setCustomersData(data));
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}></HStack>
          <Flex alignItems={"center"}>
            <Link
              href="/add-customer"
              color="blue.400"
              _hover={{ color: "blue.500" }}
            >
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
              >
                Add Customer
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>

      <Box p={4}>
        {loading ? (
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Text alignSelf={"center"} fontWeight={700}>
              {label}
            </Text>
          </Box>
        ) : (
          <></>
        )}

        <Box
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          gridGap={1}
        >
          {customersData.map((customer) => {
            return (
              <Card
                key={customer._id}
                id={customer._id}
                name={customer.name}
                phoneNumber={customer.phoneNumber}
                email={customer.email}
              />
            );
          })}
        </Box>
      </Box>
      <Toaster
        toastOptions={{
          className: "",
          duration: 1490,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
