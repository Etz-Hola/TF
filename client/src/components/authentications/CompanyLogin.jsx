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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, CheckIcon } from "@chakra-ui/icons";
// import { FcGoogle } from "react-icons/fc";
import { useRecoilState, useSetRecoilState } from "recoil";
// import authScreenAtom from "../../atoms/authAtom";
import { useState } from "react";
import userAtom from "../../atoms/userAtom";
import { prevPathAtom } from "../../atoms/prevPathAtom";
import useShowToast from "../../hooks/useShowToast";
import { useAxiosInstance } from "/api/axios";
import tokenAtom from "../../atoms/tokenAtom";

export default function CompanyLogin() {
  // const setAuthScreen = useSetRecoilState(authScreenAtom);
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
        "/company/login",
        JSON.stringify({ email, password })
      );
      console.log(response.data);
      const loggedUser = response.data;
      const token = response.data.accessToken;

      localStorage.setItem("user-workiq", JSON.stringify(loggedUser));
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

  // const handleGoogleAuth = async () => {
  //   try {
  //     const response = await axiosInstance.get("/auth/google/callback");
  //     const data = response.data;
  //     console.log(data);
  //     // navigate("/auth/google-verify");
  //   } catch (error) {
  //     console.log(error);
  //   }

  // window.location.href =
  // 	"https://quickbill-2oy7.onrender.com/auth/googleauth/callback";

  return (

    <form onSubmit={handleSubmit}>
      <Box
        w={{ base: "100%", md: "80%", lg: "100%" }}
        maxW="500px"
        mx="auto"
      >
        <FormControl
          isRequired
          w={{ base: "l", md: "400px", lg: "500px" }}
          maxW="500px"
          mx="auto"
          my={5}
        >
          <FormLabel>Company Email </FormLabel>
          <Input
            type={'text'}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="company@mail.com"
            border={"1px solid black"}
            required
          />
        </FormControl>

        <FormControl
          isRequired
          w={{ base: "l", md: "400px", lg: "500px" }}
          maxW="500px"
          mx="auto"
          my={5}
        >
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter password"
              border={"1px solid black"}
              required
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() =>
                  setShowPassword((showPassword) => !showPassword)
                }
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={10}>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}>
            <Checkbox>Remember me</Checkbox>
            <Text color={'blue.400'}><Link href="/forget-password">Forgot password?</Link></Text>
          </Stack>
          <Button
            loadingText="Signing in"
            w={{ base: "full", md: "400px", lg: "500px" }}
            // size={{ base: "lg", md: "md" }}
            bg={"blue.500"}
            color={"white"}
            _hover={{
              bg: "blue.400",
            }}
            type="submit"
            isLoading={loading}
            mx="auto"
          >
            Sign In
          </Button>
        </Stack>
      </Box>
    </form>
  );
}