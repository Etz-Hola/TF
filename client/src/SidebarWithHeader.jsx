import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Image,
    Spinner,
} from "@chakra-ui/react";
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import useLogout from "./hooks/useLogout";

const SidebarContent = ({ onClose, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('ticket-flow'));
    const userRole = user?.roles[0];
	const logout = useLogout();


    // Function to check if the user is a company representative
    const isCompanyRepresentative = (role) => role === "Company";

    return (
        <Box
            transition="3s ease"
            bg={"#000"}
            boxShadow="1px 0px 2px 1px rgba(0,0,0,0.6)"
            zIndex={99}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            color={"#fff"}
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" >
                    
                </Text>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>

            <NavItem
                as={NavLink}
                to={"/dashboard"}
                style={({ isActive }) => ({
                    color: isActive ? "#fff" : "",
                    background: isActive ? "#3B82F6" : "",
                })}
                icon={MdHome}
            >
                Dashboard
            </NavItem>

            {isCompanyRepresentative(userRole) && (
                <NavItem
                    as={NavLink}
                    to={"/company/upload"}
                    style={({ isActive }) => ({
                        color: isActive ? "#fff" : "",
                        background: isActive ? "#3B82F6" : "",
                    })}
                >
                    Upload New Train
                </NavItem>
            )}

            {isCompanyRepresentative(userRole) && (
                <NavItem
                    as={NavLink}
                    to={`/profile/${user.result._id}`}
                    style={({ isActive }) => ({
                        color: isActive ? "#fff" : "",
                        background: isActive ? "#3B82F6" : "",
                    })}
                >
                    My Available train
                </NavItem>
            )}

            {!isCompanyRepresentative(userRole) && (
                <NavItem
                    as={NavLink}
                    to={"/trains/:userId/booked"}
                    style={({ isActive }) => ({
                        color: isActive ? "#fff" : "",
                        background: isActive ? "#3B82F6" : "",
                    })}
                >
                    Tickets
                </NavItem>
            )}

            <NavItem
                as={NavLink}
                to={"/search/Train"}
                style={({ isActive }) => ({
                    color: isActive ? "#fff" : "",
                    background: isActive ? "#3B82F6" : "",
                })}
            >
                Search for Train
            </NavItem>
            
           
            <NavItem
                as={NavLink}
                to={" "}
				onClick={logout}
                style={({ isActive }) => ({
                    color: isActive ? "#fff" : "",
                    background: isActive ? "#3B82F6" : "",
                })}
            >
                Sign Out
            </NavItem>
        </Box>
    );
};

const NavItem = ({ icon, children, ...rest }) => {
    return (
        <Box>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "blue.400",
                    color: "white",
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    const logout = useLogout();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('ticket-flow'));

    return (
        <Flex
            pos={"sticky"}
            top={0}
            zIndex={9}
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={"#ECF1F6"}
            boxShadow="base"
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <HStack spacing={{ base: "0", md: "6" }}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    color="gray.600"
                    icon={<FiBell />}
                />
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <Avatar size={"sm"} src={user?.avatar} />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm" color="gray.600">
                                        {user?.roles?.includes('Company')? user?.result?.companyName: user?.result?.name}
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue("gray.200", "gray.700")}
                        >
                            <MenuItem onClick={() => navigate(`/editProfile/${user.result._id}`)}>Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={logout}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

const SidebarWithHeader = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            minH="100vh"
            bg={"#fff"}
        >
            <SidebarContent
                onClose={() => onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} minH={'100%'} p="2">
                {children}
            </Box>
        </Box>
    );
};

export default SidebarWithHeader;



// import {
// 	Accordion,
// 	AccordionItem,
// 	AccordionButton,
// 	AccordionPanel,
// 	AccordionIcon,
// 	Image,
// 	Spinner,
// } from "@chakra-ui/react";
// import {
// 	IconButton,
// 	Avatar,
// 	Box,
// 	CloseButton,
// 	Flex,
// 	HStack,
// 	VStack,
// 	Icon,
// 	useColorModeValue,
// 	Text,
// 	Drawer,
// 	DrawerContent,
// 	useDisclosure,
// 	Menu,
// 	MenuButton,
// 	MenuDivider,
// 	MenuItem,
// 	MenuList,
// } from "@chakra-ui/react";
// import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
// import { NavLink, useNavigate } from "react-router-dom";
// import { AiFillGift } from "react-icons/ai";
// import { BsGearFill } from "react-icons/bs";
// import useLogout from "./hooks/useLogout";
// import { ImArrowDownLeft2, ImArrowUpRight2 } from "react-icons/im";
// import { MdHome } from "react-icons/md";
// import { useRecoilValue } from "recoil";
// import userAtom from "./atoms/userAtom";
// // import useGetUserProfile from "./hooks/useGetProfile";

// const SidebarContent = ({ onClose, ...rest }) => {

// 	return (
// 		<Box
// 			transition="3s ease"
// 			bg={"#000"}
// 			boxShadow="1px 0px 2px 1px rgba(0,0,0,0.6)"
// 			zIndex={99}
// 			w={{ base: "full", md: 60 }}
// 			pos="fixed"
// 			h="full"
// 			color={"#fff"} ///////////////////////////////////////////////////For the sidebar
// 			{...rest}
// 		>
// 			<Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
// 				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" >
					
// 				</Text>
// 				{/* <Image src="/tflogo.png" /> */}

// 				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
// 			</Flex>

// 			<NavItem
// 				as={NavLink}
// 				to={"/dashboard"}
// 				style={({ isActive }) => ({
// 					color: isActive ? "#fff" : "",
// 					background: isActive ? "#3B82F6" : "",
// 				})}
// 				icon={MdHome}
// 			>
// 				Dashboard
// 			</NavItem>

// 			<NavItem
// 				as={NavLink}
// 				to={"/company/upload"}
// 				style={({ isActive }) => ({
// 					color: isActive ? "#fff" : "",
// 					background: isActive ? "#3B82F6" : "",
// 				})}
// 				// icon={AiFillGift}
// 			>
// 				Upload New Train
// 			</NavItem>

// 			<NavItem
// 				as={NavLink}
// 				to={`/profile/${user.result._id}`}
// 				style={({ isActive }) => ({
// 					color: isActive ? "#fff" : "",
// 					background: isActive ? "#3B82F6" : "",
// 				})}
// 				// icon={AiFillGift}
// 			>
// 				My Available train
// 			</NavItem>

// 			<NavItem
// 				as={NavLink}
// 				to={"/search/Train"}
// 				style={({ isActive }) => ({
// 					color: isActive ? "#fff" : "",
// 					background: isActive ? "#3B82F6" : "",
// 				})}
// 				// icon={AiFillGift}
// 			>
// 				Search for Train/Bus
// 			</NavItem>
			
// 			<NavItem
// 				as={NavLink}
// 				to={"/invoice-me"}
// 				style={({ isActive }) => ({
// 					color: isActive ? "#fff" : "",
// 					background: isActive ? "#3B82F6" : "",
// 				})}
// 				icon={AiFillGift}
// 			>
// 				My Ticket
// 			</NavItem>
// 			<NavItem
// 				as={NavLink}
// 				to={"/invoice-me"}
// 				style={({ isActive }) => ({
// 					color: isActive ? "#fff" : "",
// 					background: isActive ? "#3B82F6" : "",
// 				})}
// 				// icon={AiFillGift}
// 			>
// 				Pa
// 			</NavItem>
// 			<NavItem
// 				as={NavLink}
// 				to={"/invoice-me"}
// 				style={({ isActive }) => ({
// 					color: isActive ? "#fff" : "",
// 					background: isActive ? "#3B82F6" : "",
// 				})}
// 				// icon={AiFillGift}
// 			>
// 				In
// 			</NavItem>
			
// 		</Box>
// 	);
// };

// const NavItem = ({ icon, children, ...rest }) => {
// 	return (
// 		<Box>
// 			<Flex
// 				align="center"
// 				p="4"
// 				mx="4"
// 				borderRadius="lg"
// 				role="group"
// 				cursor="pointer"
// 				_hover={{
// 					bg: "blue.400",
// 					color: "white",
// 				}}
// 				{...rest}
// 			>
// 				{icon && (
// 					<Icon
// 						mr="4"
// 						fontSize="16"
// 						as={icon}
// 					/>
// 				)}
// 				{children}
// 			</Flex>
// 		</Box>
// 	);
// };

// const user = JSON.parse(localStorage.getItem('ticket-flow'))


// const MobileNav = ({ onOpen, ...rest }) => {
// 	const logout = useLogout();
// 	// console.log(user)
// 	const navigate = useNavigate();

// console.log(user)
// 	return (
// 		<Flex
// 			pos={"sticky"}
// 			top={0}
// 			zIndex={9}
// 			ml={{ base: 0, md: 60 }}
// 			px={{ base: 4, md: 4 }}
// 			height="20"
// 			alignItems="center"
// 			bg={"#ECF1F6"}
// 			boxShadow="base"
// 			justifyContent={{ base: "space-between", md: "flex-end" }}
// 			{...rest}
// 		>
// 			<IconButton
// 				display={{ base: "flex", md: "none" }}
// 				onClick={onOpen}
// 				variant="outline"
// 				aria-label="open menu"
// 				icon={<FiMenu />}
// 			/>

// 			<Image display={{ base: "flex", md: "none" }} src="/tflogo.png" />

// 			<HStack spacing={{ base: "0", md: "6" }}>
// 				<IconButton
// 					size="lg"
// 					variant="ghost"
// 					aria-label="open menu"
// 					color="gray.600"
// 					icon={<FiBell />}
// 				/>
// 				<Flex alignItems={"center"}>
// 					<Menu>
// 						<MenuButton
// 							py={2}
// 							transition="all 0.3s"
// 							_focus={{ boxShadow: "none" }}
// 						>
// 							<HStack>
// 								<Avatar size={"sm"} src={user?.avatar} />
// 								<VStack
// 									display={{ base: "none", md: "flex" }}
// 									alignItems="flex-start"
// 									spacing="1px"
// 									ml="2"
// 								>
// 									<Text fontSize="sm" color="gray.600">
// 										{user?.roles?.includes('Company')? user?.result?.companyName: user?.result?.name}
// 										{/* olayemi adeke */}
// 									</Text>
// 								</VStack>
// 								<Box display={{ base: "none", md: "flex" }}>
// 									<FiChevronDown />
// 								</Box>
// 							</HStack>
// 						</MenuButton>
// 						<MenuList
// 							bg={useColorModeValue("white", "gray.900")}
// 							borderColor={useColorModeValue("gray.200", "gray.700")}
// 						>
// 							<MenuItem onClick={() => navigate(`/editProfile/${user.result._id}`)}>Profile</MenuItem>
// 							<MenuDivider />
// 							<MenuItem onClick={logout}>Sign out</MenuItem>
// 						</MenuList>
// 					</Menu>
// 				</Flex>
// 			</HStack>
// 		</Flex>
// 	);
// };

// const SidebarWithHeader = ({ children }) => {
// 	const { isOpen, onOpen, onClose } = useDisclosure();

// 	return (
// 		<Box
// 			minH="100vh"
// 			bg={"#fff"} ///////////////////////////////////////////////////////////For the whole box
// 		>
// 			<SidebarContent
// 				onClose={() => onClose}
// 				display={{ base: "none", md: "block" }}
// 			/>
// 			<Drawer
// 				isOpen={isOpen}
// 				placement="left"
// 				onClose={onClose}
// 				returnFocusOnClose={false}
// 				onOverlayClick={onClose}
// 				size="full"
// 			>
// 				<DrawerContent>
// 					<SidebarContent onClose={onClose} />
// 				</DrawerContent>
// 			</Drawer>
// 			{/* mobilenav */}
// 			<MobileNav onOpen={onOpen} />
// 			<Box ml={{ base: 0, md: 60 }} minH={'100%'} p="2">
// 				{children}
// 			</Box>
// 		</Box>
// 	);
// };

// export default SidebarWithHeader;
