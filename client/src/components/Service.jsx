import { Box, SimpleGrid, Icon, Text, Stack, Flex, Center, Container } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack textAlign="center">
      <Flex
        w={"1px"}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Center>
      <Container maxW="container.lg" p={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={'Lifetime Support'}
            text={
              'Lorem ipsum dolor sit amet, consetetur.'
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={'Unlimited Donations'}
            text={
              'Lorem ipsum dolor sit amet, consetetur.'
            }
          />
          <Feature
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={'Instant Delivery'}
            text={
              'Lorem ipsum dolor sit amet, consetetur.'
            }
          />
        </SimpleGrid>
      </Container>
    </Center>
  );
}
