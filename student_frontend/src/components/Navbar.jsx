// src/components/Navbar.jsx
import { Flex, Heading, HStack, Button } from "@chakra-ui/react"

const Navbar = () => {
  return (
    <Flex 
      as="nav"
      background="gray.900" 
      width="100%" 
      padding="4" 
      color="white"
      align="center"
      justify="space-between"
    >
      <Heading size="md" color="white">
        Student Management System
      </Heading>

      <HStack spacing={3}>
        <Button variant="ghost" colorScheme="whiteAlpha" size="sm">
          Login
        </Button>
        <Button colorScheme="blue" size="sm">
          Register
        </Button>
      </HStack>
    </Flex>
  )
}

export default Navbar