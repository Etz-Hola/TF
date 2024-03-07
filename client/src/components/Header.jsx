import { Box, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <>
      <header className='header'>
        <Box >        
        <Image bg={"#fff"} src="/herrobag.png" borderRadius={8}  />
        </Box>

        <Box w='100%' h='200px' bgGradient='linear(to-r, green.200, pink.500)' />


      </header>
        

    </>
  );
};

export default Header;
