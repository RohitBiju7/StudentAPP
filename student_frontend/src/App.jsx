// src/App.jsx
import { Routes, Route, Link as RouterLink } from 'react-router-dom'
import { Container, Heading, Text, VStack, Button, HStack } from '@chakra-ui/react'
import Navbar from './components/Navbar.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import StudentTable from './components/StudentTable.jsx'
import Feedback from './components/Feedback.jsx'

const Home = () => {
  return (
    <Container maxW="lg" py={20} textAlign="center">
      <VStack gap={6}>
        <Heading size="2xl" color="white">
          Welcome to the Student Management System
        </Heading>
        <Text color="gray.400" fontSize="lg">
          Manage profiles, track records, and streamline administration in one place.
        </Text>
        <HStack gap={4} mt={4}>

          <Button asChild bg="gray.800" color="white" _hover={{ bg: "gray.700" }} size="lg">
            <RouterLink to="/login">Login</RouterLink>
          </Button>

          <Button asChild variant="ghost" bg="gray.800" color="white" _hover={{ bg: "gray.700" }} size="lg">
            <RouterLink to="/register">Register</RouterLink>
          </Button>
          
        </HStack>
      </VStack>
    </Container>
  )
}

const App = () => {
  return (
    <div style={{ backgroundColor: '#09090b', minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/students" element={<StudentTable />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  )
}

export default App