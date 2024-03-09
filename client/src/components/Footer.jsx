import React from "react";

import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Image,
  Flex,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Box bg={"#C6D9FE"} color={useColorModeValue("gray.700", "gray.200")}>
        <Box marginLeft={20}>
          <Text as={"h1"} fontSize={"xl"} fontWeight={600}>
            We are very happy
            that you choose us
          </Text>
          <Text as={"h4"} fontSize={"sm"} fontWeight={600}>
            Thank you for trusting us for choosing trips, exploring, traveling with relatives
            and friends or for your own experiences.
          </Text>
        </Box>

        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={"flex-start"}>
              <Text as={"h1"} fontSize={"lg"} fontWeight={600}>
                HOW DOES IT WORKS
              </Text>
              <Box>
                <Text as={"h1"} fontSize={"sm"} fontWeight={600}>
                  Book Ticket Online Easily
                </Text>
                <Text as={"h1"} fontSize={"sm"} fontWeight={600}>
                  Travel Effortlessly
                </Text>
                <Text as={"h1"} fontSize={"sm"} fontWeight={600}>
                  Travel Effortlessly
                </Text>
              </Box>
            </Stack>

            <Stack align={"flex-start"}>
              <Text as={"h1"} fontSize={"lg"} fontWeight={600}>
                SOLUTIONS
              </Text>
              <Box>
                <Text as={"h1"} fontSize={"sm"} fontWeight={600}>
                  Safe Travels <br /> Easy Booking <br /> Save Time
                </Text>
              </Box>
            </Stack>

            <Stack align={"flex-start"}>
              <Text as={"h1"} fontSize={"lg"} fontWeight={600}>
                RESOURCES
              </Text>
              <Box>
                <Text as={"h1"} fontSize={"sm"} fontWeight={600}>
                  About
                </Text>
              </Box>
            </Stack>

            <Stack align={"flex-start"}>
              <Image src="/tflogo.png" width={40} height={10} />
              <Flex gap={5} pt={19} >
                <Image src="/insta.png" width={8} height={8} />
                <Image src="/facebook.png" width={8} height={8} />
                <Image src="/link.png" width={8} height={8} />
                <Image src="/twitter.png" width={8} height={8} />
              </Flex>
            </Stack>
          </SimpleGrid>
        </Container>

        <Box borderTopWidth={1} borderStyle={"solid"} borderColor={"black"}>
          <Container
            as={Stack}
            maxW={"6xl"}
            py={4}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ md: "space-between" }}
            align={{ md: "center" }}
          >
            <Text> © Copyright 2024. All Rights Reserved.</Text>
            <Stack direction={"row"} spacing={6}>
              <Box>Disclaimer</Box>
              <Box>Privacy Policy</Box>
              <Box>Terms of Service</Box>
              <Box>Cookie policy</Box>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
