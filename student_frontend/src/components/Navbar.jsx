// src/components/Navbar.jsx
import { Flex, HStack, Button, Link as ChakraLink, Icon } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { GraduationCap, NotebookTabs, MessageSquareText, UserPlus } from "lucide-react"

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
      borderBottom="1px solid"
      borderColor="gray.800"
    >
      {/* Clickable Brand / Logo Icon */}
      <ChakraLink 
        as={Link} 
        to="/" 
        display="flex" 
        alignItems="center" 
        _hover={{ textDecoration: "none", opacity: 0.8 }}
      >
        <Icon as={GraduationCap} boxSize={7} color="ghost.400" />
      </ChakraLink>

      <HStack gap={3}>
        
        <Button asChild colorPalette="ghost" size="sm" bg="gray.800" color="white" _hover={{ bg: "gray.700" }}>
          <Link to="/register"><UserPlus />Register</Link>
        </Button>
        
        <Button asChild colorPalette="ghost" size="sm" bg="gray.800" color="white" _hover={{ bg: "gray.700" }}>
          <Link to="/students"><NotebookTabs />Directory</Link>
        </Button>

        <Button asChild colorPalette="ghost" size="sm" bg="gray.800" color="white" _hover={{ bg: "gray.700" }}>
          <Link to="/feedback"><MessageSquareText />Feedback</Link>
        </Button>
      </HStack>
    </Flex>
  )
}

export default Navbar