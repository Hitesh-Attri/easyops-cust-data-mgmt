import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Toaster, toast } from "react-hot-toast";
import BASE_URL from "@/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { setDltId, setEditCustomerObj } from "../redux/counter";

const Card = ({ id, name, phoneNumber, email }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isView, setIsView] = useState(false);

  const handleDelete = async (id) => {
    dispatch(setDltId(id));
    console.log(id);

    try {
      let res = await axios.delete(`${BASE_URL}/delete-customer/${id}`);
      // console.log(res.data);
      if (res.data.success) {
        toast.success("Customer deleted.");
        onClose();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      onClose();
    }
  };
  return (
    <Box
      boxSize={"sm"}
      color={"black"}
      borderRadius={10}
      display={"flex"}
      justifyContent={"center"}
    >
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
          setIsView(false);
          onClose();
        }}
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="20%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>{isView ? "Customer" : "Delete Customer"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isView ? (
              <Box>
                <Heading as="h5" size="sm" sx={{}}>
                  Name: {name}
                </Heading>
                <Text fontSize="sm">Phone Number: {phoneNumber}</Text>
                <Text fontSize="sm">Email: {email}</Text>
              </Box>
            ) : (
              <Text>Are you sure you want to delete?</Text>
            )}
          </ModalBody>

          <ModalFooter>
            {isView ? (
              <>
                <Button
                  colorScheme="teal"
                  mr={3}
                  onClick={() => {
                    // setIsView(false);
                    dispatch(
                      setEditCustomerObj({ id, name, phoneNumber, email })
                    );
                    router.push(`/update-customer`);
                  }}
                >
                  Update
                </Button>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    setIsView(false);
                    onClose();
                  }}
                >
                  Close
                </Button>
              </>
            ) : (
              <>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(id);
                  }}
                  colorScheme="red"
                >
                  <DeleteIcon /> Delete
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack spacing={4} alignItems={"flex-start"}>
        <Box padding={1}>
          <Heading as="h5" size="sm" sx={{}}>
            Name: {name}
          </Heading>
          <Text fontSize="sm">Phone Number: {phoneNumber}</Text>
          <Text fontSize="sm">Email: {email}</Text>
          <HStack spacing={4}>
            <Button
              colorScheme="blue"
              onClick={() => {
                setIsView(true);
                onOpen();
              }}
            >
              See
            </Button>
            <Button colorScheme="red" onClick={onOpen}>
              <DeleteIcon />
            </Button>
          </HStack>
        </Box>
      </VStack>
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </Box>
  );
};

export default Card;
