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
	InputGroup,
	InputRightElement,
	HStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, CheckIcon } from "@chakra-ui/icons";
// import { FcGoogle } from "react-icons/fc";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../../../api/axios";
import userAtom from "../../atoms/userAtom";
import useShowToast from "../../hooks/useShowToast";
import activationToken from "../../atoms/activationTokenAtom";

export default function UserSignUp() {
	// const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const setActivationToken = useSetRecoilState(activationToken)
	const setUser = useSetRecoilState(userAtom);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);
	const axiosInstance = useAxiosInstance();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return showToast("Error", "password does not correspond", "error");
		}
		setLoading(true);
		try {
			const response = await axiosInstance.post(
				"/auth/signup",
				JSON.stringify({ name, phoneNumber, email, password, confirmPassword })
			);
			// const loggedUser = response.data.loggedInUser;
			const data = response.data;
			console.log(response)

			if (data.message) {
				showToast("Success", data.message, "success");
			}
			setUser(data);
			setActivationToken(data.activationToken)

			navigate("/activate-verify");
		} catch (error) {
			console.log(error);
			
			if (!error.status) {
				console.log("No Server Response");
			} else if (error.status === 400) {
				showToast("Error", error.data.error, "error");
			} else if (error.status === 401) {
				console.log("Unauthorized");
			} else {
				console.log(err.data?.message);
			}
		} finally {
			setLoading(false);
		}
	};

	// const handleGoogleAuth = async () => {
	// 	try {
	// 		const response = await axiosInstance.get("/auth/google");
	// 		const data = response.data;
	// 		navigate("/auth/google-verify");
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	// window.location.href =
	// 	// 	"https://quickbill-2oy7.onrender.com/auth/googleauth";
	// };

	return (
		<Stack  minH={"100vh"} direction={{ base: "column", md: "row" }}>
			<Flex
				flexDir={{ base: "column-reverse", md: "column" }}
				w={{ base: "full", md: "40%" }}
			>
				<Box
					position="relative"
					bgImage="url('/authImg.png')"
					bgPosition="center"
					bgRepeat="no-repeat"
					bgSize="cover"
					// h={"100vh"}
					minH={"100vh"}
					display={{ base: "none", md: "block" }}
				>
					<Box
						pos={"absolute"}
						fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
						fontWeight={{ base: "3xl", md: "4xl", lg: "5xl" }}
						color="#fff"
						py={3}
						px={{ base: 4, md: 18 }}
						display={{ base: "none", md: "block" }}
					>
						{/* <Text
							as={"h2"}
							fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
							fontWeight={{ base: "3xl", md: "4xl", lg: "5xl" }}						
						>
							Ticket Flow
						</Text>
						<Flex gap={1} alignItems={"center"}>
							<CheckIcon boxSize={4} />
							<Text as={"h2"}>Will make it easier and better</Text>
						</Flex> */}
					</Box>
				</Box>
			</Flex>
			<Flex p={8} flex={1} align={"center"} justify={"center"} 
            // bg={"blue.300"}
            >
				<Stack spacing={4} w={"full"} maxW={"md"}>
					<Heading>
						<Text align="center" fontSize={"4xl"}>Create an Acount</Text>
						{/* <Text align="center" fontSize={"lg"} color={"#969696"}>
							Sign up to enjoy the feature of Ticket-Flow.
						</Text> */}
					</Heading>
					{/* <Flex align={"center"} flexDir={"column"} gap={2}>
						<Button
							bg={"blue.300"}
							border={"1px solid black"}
							_hover={{ bg: "white" }}
							size={{ base: "sm", md: "md" }}
							leftIcon={<FcGoogle size={24} />}
							color={"black"}
							onClick={handleGoogleAuth}
						>
							Continue with Google
						</Button>
					</Flex> */}

					<form onSubmit={handleSubmit} className='text-color blue.400'>
						<Stack spacing={4}>
							<Box maxW="500px" mx="auto">
								<HStack>
									{/* <Box>
										<FormControl isRequired>
											<Input
												type="text"
												onChange={(e) => setUsername(e.target.value)}
												placeholder="Username"
												value={username}
												color={"black"}
												border={"1px solid black"}
												required
											/>
										</FormControl>
									</Box> */}
									<Box>
										<FormControl isRequired my={5}>
											<Input
												type="text"
												onChange={(e) => setName(e.target.value)}
												placeholder="Full name"
												value={name}
												color={"black"}
												border={"1px solid black"}
												required
												w={"500px"}
											/>
										</FormControl>
									</Box>
								</HStack>

								<FormControl isRequired my={5}>
									<Input
										type="phoneNumber"
										onChange={(e) => setPhoneNumber(e.target.value)}
										value={phoneNumber}
										placeholder="phoneNumber"
										border={"1px solid black"}
										required
									/>
								</FormControl>

								<FormControl isRequired my={5}>
									<Input
										type="email"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										placeholder="Email address"
										border={"1px solid black"}
										required
									/>
								</FormControl>

								<FormControl isRequired my={5}>
									<InputGroup>
										<Input
											type={showPassword ? "text" : "password"}
											onChange={(e) => setPassword(e.target.value)}
											value={password}
											placeholder="Password"
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

								<FormControl isRequired my={5}>
									<InputGroup>
										<Input
											type={showConfirmPassword ? "text" : "password"}
											onChange={(e) => setConfirmPassword(e.target.value)}
											value={confirmPassword}
											placeholder="Confirm password"
											border={"1px solid black"}
											required
										/>
										<InputRightElement h={"full"}>
											<Button
												variant={"ghost"}
												onClick={() =>
													setShowConfirmPassword(
														(showConfirmPassword) => !showConfirmPassword
													)
												}
											>
												{showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>

								<Stack spacing={10} pt={2}>
									<Button
										loadingText="Signing you up"
										size={{ base: "lg", md: "md" }}
										bg={"blue.400"}
										color={"white"}
										_hover={{
											bg: "blue.500",
										}}
										type="submit"
										isLoading={loading}
									>
										Sign up
									</Button>
								</Stack>
							</Box>
							
						</Stack>
					</form>
					
				</Stack>
			</Flex>
			
		</Stack>
	);
}
