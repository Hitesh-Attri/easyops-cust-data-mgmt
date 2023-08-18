"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  ButtonGroup,
  CSSReset,
  Heading,
  Icon,
  ThemeProvider,
  theme,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Text,
  useColorModeValue,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { AiOutlineHome } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import { AddIcon } from "@chakra-ui/icons";

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const initialValues = {
  name: "",
  phoneNumber: "",
  email: "",
};

export default function Page() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      console.log(values, "values");
      setSubmitting(true);
      // console.log(toTitleCase(values.name.trim()));
      // toast.success("yup, submmit");
      await createCustomer(values);
      setSubmitting(false);
      action.resetForm();
    },
  });

  const createCustomer = async (values) => {
    try {
      const res = await axios.post(`/api/create-customer`, {
        name: toTitleCase(values.name.trim()),
        phoneNumber: values.phoneNumber,
        email: values.email,
      });
      console.log(res.data, "res.data");
      toast.success("Customer Added Successfully");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.log(error, "error");
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}></HStack>
          <Flex alignItems={"center"}>
            <Link href="/" color="blue.400" _hover={{ color: "blue.500" }}>
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<AiOutlineHome />}
              >
                Home
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
      <Box p={4}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Add Customer
        </Text>
        <Box w={"80%"} p={4} m="20px auto">
          <Box
            as="form"
            p={4}
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   toast.success("handleSubmit");
            // }}
            onSubmit={handleSubmit}
          >
            <Box display="flex" sx={{ gap: "2em" }}>
              <FormControl isInvalid={errors.name && touched.name} my={4}>
                <FormLabel htmlFor={"name"}>Name</FormLabel>
                <Input
                  textTransform={"capitalize"}
                  autoComplete="off"
                  placeholder="Enter Name"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.phoneNumber && touched.phoneNumber}
                my={4}
              >
                <FormLabel htmlFor={"phoneNumber"}>Phone Number</FormLabel>
                <Input
                  autoComplete="off"
                  maxLength={10}
                  placeholder="Enter Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
              </FormControl>
            </Box>

            <Box display="flex" sx={{ gap: "2em" }}>
              <FormControl isInvalid={errors.email && touched.email} my={4}>
                <FormLabel htmlFor={"email"}>Email</FormLabel>
                <Input
                  autoComplete="off"
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
            </Box>

            <ButtonGroup spacing={4}>
              <Button
                isLoading={submitting}
                loadingText="Submitting"
                variantcolor="teal"
                type="submit"
              >
                Submit
              </Button>
              <Button
                variantcolor="teal"
                variant="outline"
                onClick={() => {
                  resetForm();
                }}
                isDisabled={submitting}
              >
                Reset
              </Button>
            </ButtonGroup>
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
        </Box>
      </Box>
    </>
  );
}
