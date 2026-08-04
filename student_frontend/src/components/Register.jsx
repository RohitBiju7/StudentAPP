import { useState } from "react"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  VStack,
  Text,
  IconButton,
} from "@chakra-ui/react"
import { FiEye, FiEyeOff } from "react-icons/fi"

const Register = () => {
  // 1. Form state to store inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  // 2. State for toggle password visibility
  const [showPassword, setShowPassword] = useState(false)

  // 3. Handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // 4. Handle form submission (MERN backend integration point)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Submitted:", formData)
    // Here you will make an axios/fetch post request to your Express server
  }

  return (
    <Container maxW="md" py={12}>
      <Box
        bg="gray.900"
        color="white"
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        border="1px solid"
        borderColor="gray.800"
      >
        <Heading size="lg" mb={2} textAlign="center">
          Student Registration
        </Heading>
        <Text color="gray.400" fontSize="sm" mb={6} textAlign="center">
          Create an account to manage your student profile
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {/* Full Name */}
            <Box w="full">
              <Text as="label" fontSize="sm" color="gray.300" mb={2} display="block">
                Full Name
              </Text>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                bg="gray.800"
                borderColor="gray.700"
                _hover={{ borderColor: "gray.600" }}
                _focus={{ borderColor: "blue.400", bg: "gray.800" }}
              />
            </Box>

            {/* Email Address */}
            <Box w="full">
              <Text as="label" fontSize="sm" color="gray.300" mb={2} display="block">
                Email Address
              </Text>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@university.edu"
                bg="gray.800"
                borderColor="gray.700"
                _hover={{ borderColor: "gray.600" }}
                _focus={{ borderColor: "blue.400", bg: "gray.800" }}
              />
            </Box>

            {/* Password */}
            <Box w="full">
              <Text as="label" fontSize="sm" color="gray.300" mb={2} display="block">
                Password
              </Text>
              <Flex align="center" gap={2}>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  bg="gray.800"
                  borderColor="gray.700"
                  _hover={{ borderColor: "gray.600" }}
                  _focus={{ borderColor: "blue.400", bg: "gray.800" }}
                />
                <IconButton
                  size="sm"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <FiEyeOff /> : <FiEye />}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                />
              </Flex>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              mt={4}
              size="lg"
            >
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  )
}

export default Register