import { React } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Link,
  Box,
  Checkbox,
  InputGroup,
  InputRightElement,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon, CheckIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { useRecoilState, useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
import { useState } from "react";
import userAtom from "../../atoms/userAtom";
import { prevPathAtom } from "../../atoms/prevPathAtom";
import useShowToast from "../../hooks/useShowToast";
import { useAxiosInstance } from "/api/axios";
import tokenAtom from "../../atoms/tokenAtom";
import UserLogin from "./UserLogin";
import CompanyLogin from "./CompanyLogin";

export default function SplitScreen() {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [showPassword, setShowPassword] = useState(false);
  const setUsers = useSetRecoilState(userAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [prevPath, setPrevPath] = useRecoilState(prevPathAtom);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useRecoilState(tokenAtom);
  const axiosInstance = useAxiosInstance();
  const showToast = useShowToast();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        JSON.stringify({ email, password })
      );
      console.log(response.data);
      const loggedUser = response.data;
      const token = response.data.accessToken;
      console.log(loggedUser)

      localStorage.setItem("ticket-flow", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);

      setToken(token);
      setUsers(loggedUser);

      const localStoragePrevPath = localStorage?.getItem("localPrevPath");
      // Redirect to the originally requested route (or a default route)
      if (localStoragePrevPath) {
        localStorage.removeItem("localPrevPath");
        navigate(localStoragePrevPath);
      } else if (prevPath) {
        setPrevPath(null); // Clear the stored path
        navigate(prevPath);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        showToast(
          "Error",
          "This user registered with Google authentication, continue with google and create password",
          "error"
        );
      }
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const response = await axiosInstance.get("/auth/google/callback");
      const data = response.data;
      console.log(data);
      // navigate("/auth/google-verify");
    } catch (error) {
      console.log(error);
    }

    // window.location.href =
    // 	"https://quickbill-2oy7.onrender.com/auth/googleauth/callback";
  };

  return (
    <Stack
      minH={"100vh"}
      overflowX={"hidden"}
      direction={{ base: "column", md: "row" }}
      className="loginSignup"
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"} bg={"#f6f6f6"}>
        <Stack
          spacing={4}
          w={{ base: "full", md: "md" }}
          maxW={"md"}
          // align={"center"}
        >
          <Heading>
            <Text fontSize={"4xl"}>Sign in</Text>
            <Text fontSize={"lg"} color={"#969696"}>
              Please login to continue to your account.
            </Text>
          </Heading>

          <Tabs variant="unstyled">
            <TabList>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>
                Login as a User
              </Tab>
              <Tab _selected={{ color: "white", bg: "green.400" }}>
                Login as Company
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack spacing={4}>
                  <UserLogin />
                </Stack>{" "}
              </TabPanel>
              <TabPanel>
              <Stack spacing={4}>
                  <CompanyLogin />
                </Stack>{" "}
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Stack pt={6}>
            <Text align={"center"}>
              Don&apos;t have an account?{" "}
              <Link color={"blue.400"} onClick={() => setAuthScreen("signp")}>
                Sign Up
              </Link>
            </Text>
          </Stack>
          <Flex align={"center"} flexDir={"column"} gap={2}>
            <Flex fontWeight={"3000"} gap={4}>
              <Button
                // bg={"#3B82F6"}
                border={"1px solid black"}
                _hover={{ bg: "white" }}
                size={{ base: "sm", md: "md" }}
                leftIcon={<FcGoogle size={24} />}
                color={"black"}
                onClick={handleGoogleAuth}
              >
                Continue with Google
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Flex>
      {/* <Flex
        flexDir={{ base: "column-reverse", md: "column" }}
        w={{ base: "full", md: "40%" }}
      >
        <Box
          position="relative"
          bgImage="url('/authImg.png')"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          h={"100vh"}
          display={{ base: "none", md: "block" }}
        >
          <Box
            pos={"absolute"}
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            fontWeight={{ base: "3xl", md: "4xl", lg: "5xl" }}
            color="#000"
            py={3}
            px={{ base: 4, md: 18 }}
            display={{ base: "none", md: "block" }}
          >
            <Text
              as={"h2"}
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              fontWeight={{ base: "3xl", md: "4xl", lg: "5xl" }}
            >
              Success starts here
            </Text>
            <Flex gap={1} alignItems={"center"}>
              <CheckIcon boxSize={4} />
              <Text as={"h2"}>Pay per project, not per hour</Text>
            </Flex>
            <Flex gap={1} alignItems={"center"}>
              <CheckIcon boxSize={4} />
              <Text as={"h2"}>Access to talent and businesses</Text>
            </Flex>
            <Text as={"h2"} textAlign={"center"}>
              across the global
            </Text>
          </Box>
        </Box>
      </Flex> */}
    </Stack>
  );
}
