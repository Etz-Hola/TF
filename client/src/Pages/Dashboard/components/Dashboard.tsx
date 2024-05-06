import React, { useRef, useState } from "react";
import SidebarWithHeader from "../../../SidebarWithHeader";
import { Button, FormControl, FormLabel, Heading, Input, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/color-mode";

export default function ProfilePage() {
  const fileRef = useRef(null);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    password: "",
  });

  return (
    
      <form>
        <div className="flex justify-center my-6">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
            <div className="flex">
              <Link to={-1}>
                <FaArrowLeft />
              </Link>
            </div>
            <Center>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                User Profile
              </Heading>
            </Center>
            <FormControl>
              <div className="flex flex-col md:flex-row">
                <Center>
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
                    <img
                      className="w-full h-full object-cover"
                      // src={imgUrl || user.profilePic}
                      alt="Profile"
                    />
                  </div>
                </Center>
                <Center className="w-full md:w-auto">
                  <Button
                    onClick={() => fileRef.current.click()}
                    className="w-full md:w-auto"
                  >
                    Change Avatar
                  </Button>
                  <Input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileRef}
                    // onChange={handleImageChange}
                  />
                </Center>
              </div>
            </FormControl>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Your fullname"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder="Your Bio..."
                _placeholder={{ color: "gray.500" }}
                type="textarea"
                value={inputs.bio}
                onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              />
            </FormControl>
            {/* <FormControl>
							<FormLabel>Password</FormLabel>
							<Input
								placeholder="password"
								_placeholder={{ color: "gray.500" }}
								type="password"
								// value={inputs.password}
								onChange={(e) =>
									setInputs({ ...inputs, password: e.target.value })
								}
							/>
						</FormControl>
						<Stack spacing={6} direction={["column", "row"]} >
							<Button
								bg={"red.400"}
								color={"white"}
								w="full"
								_hover={{
									bg: "red.500",
								}}
								onClick={() => navigate(-1)}
							>
								Cancel
							</Button>
							<Button
								bg={"green.400"}
								color={"white"}
								w="full"
								_hover={{
									bg: "green.500",
								}}
                                type="submit"
                                // isLoading={updating}
							>
								Submit
							</Button>
						</Stack> */}
          </div>
        </div>
      </form>
    
  );
}



// import React from 'react'
// import Profile from '../../Profile/components/Profile'
// import BookedTickets from '../../../components/TicketManagement/BookedTickets'
// import TicketBooking from '../../TicketManagement/TicketBooking'

// const Dashboard = () => {
//   return (
//     <div>
//       {/* <Profile/> */}
//       {/* <BookedTickets/> */}
//       {/* <TicketBooking/> */}
      
//     </div>
//   )
// }
   
// export default Dashboard