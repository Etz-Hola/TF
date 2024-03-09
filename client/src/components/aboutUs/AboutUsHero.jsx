import {Text, Flex, useColorModeValue} from '@chakra-ui/react'

const AboutUsHero = () => {
  return (
    <>
   <Flex bg={useColorModeValue('white', 'gray.800')} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}
   >
    <Flex mt={20}>
    <Text as={'h1'} fontSize={'4xl'} mb={30} fontWeight={500}>About us</Text>
    </Flex>
    <Flex mb={5}>

    <Text as={'h2'} fontSize={'2xl'}  fontWeight={500}> WE EXIST TO AMPLIFY</Text>
    </Flex>
    <Text fontWeight={300} px={35}>Welcome to our train ticketing app, where convenience meets seamless travel experiences. At Ticket-Flow, we're passionate about simplifying the process of booking train tickets, making travel accessible to everyone 
    Lorem ipsum dolor sit amet consectetur, 
    adipisicing elit. Tempore iure amet obcaecati repellendus veritatis, nostrum laboriosam a aut sapiente, quisquam officiis eius, debitis amet eaque sunt obcaecati excepturi, modi at!</Text>

   </Flex>
    </>
  )
}

export default AboutUsHero