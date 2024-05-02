import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FiMinus } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";

const Faq = () => {
  return (

    <React.Fragment>

      <Flex
        justifyContent={"center"}
        align={"center"}
        py={{ base: 8, md: 70 }}
        px={{ base: 8, md: 72 }}
      >
        <Flex justifyContent={"center"} alignItems={"center"} p={"auto"}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem
              bg={"#fff"}
              border={"1px solid #2970FF"}
              boxShadow={"0px 6px 16px 0px rgba(74, 58, 255, 0.19)"}
              borderRadius={10}
            >
              {({ isExpanded }) => (
                <>

                  <h2>
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        pr={{ base: 8, md: 15 }}
                        fontWeight={{ base: 500, md: 400 }}
                        fontSize={{ base: "md", md: "lg", lg: "xl" }}
                      >
                        How far in advance can I book train tickets
                        through your app?
                      </Box>
                      {isExpanded ? (
                        <Box borderRadius={"full"} bg={"#2970FF"}>
                          <FiMinus color="#fff" size={20} />
                        </Box>
                      ) : (
                        <Box borderRadius={"full"} bg={"#2970FF"}>
                          <IoAdd color="#fff" size={20} />
                        </Box>
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text as={"p"} fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                      You can typically book train tickets through our app up to 120 days in advance, depending on the specific train operator and route. This allows you to plan your journey well ahead of time and secure your preferred travel dates and times.
                    </Text>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem
              bg={"#fff"}
              border={"1px solid #2970FF"}
              boxShadow={"0px 6px 16px 0px rgba(74, 58, 255, 0.19)"}
              borderRadius={10}
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        pr={{ base: 8, md: 15 }}
                        fontWeight={{ base: 500, md: 500 }}
                        fontSize={{ base: "md", md: "lg", lg: "xl" }}
                      >
                        What payment methods do you accept for
                        ticket bookings?
                      </Box>
                      {isExpanded ? (
                        <Box borderRadius={"full"} bg={"#2970FF"}>
                          <FiMinus color="#fff" size={20} />
                        </Box>
                      ) : (
                        <Box borderRadius={"full"} bg={"#2970FF"}>
                          <IoAdd color="#fff" size={20} />
                        </Box>
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                    We accept a variety of payment methods to accommodate our users' preferences. These include credit and debit cards (Visa, Mastercard, American Express), mobile payment options (Apple Pay, Google Pay), as well as other digital wallets. Additionally, we offer the option for some users to pay in cash at select partner locations for added convenience..
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default Faq;
