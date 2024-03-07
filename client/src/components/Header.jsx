import { Box, Flex, Text } from "@chakra-ui/react";


const Header = () => {
  return (
    <>

      <Flex
        px={{ base: 8, md: 20 }}
        justifyContent={{ md: "space-between" }} 
        alignItems={"center"}
        gap={{ md: 10, lg: 5 }}
        w={"full"}
        bgImage={"/herrobag.png"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        height={"400px"}
      >
        <Flex
          flexDir={"column"}
          // w={500}
          gap={{ md: .2, lg: 1 }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text
            fontSize={{ base: "3xl", md: "3xl", lg: "5xl" }}
            fontWeight={100}
            color={"#fff"}
            margin={"30"}
          >

            <Text>Explore Around effortlessly by train and bus</Text>
          </Text>

          <Box bg="white"
          w={700}
          height={39}
          >
            
          </Box>


        </Flex>
      </Flex>

      <Box w='100%' h='200px' bgGradient='linear(to-r, green.200, pink.500)' />

    </>
  );
};

export default Header;
