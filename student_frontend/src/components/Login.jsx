import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
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
  Link,
} from "@chakra-ui/react"
import { FiEye, FiEyeOff } from "react-icons/fi"

const Login = () => {
  // 1. Form state (Login only needs email & password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // 2. Toggle password visibility
  const [showPassword, setShowPassword] = useState(false)

  // 3. Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // 4. Handle submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login Form Submitted:", formData)
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
          Student Login
        </Heading>
        <Text color="gray.400" fontSize="sm" mb={6} textAlign="center">
          Enter your credentials to access your portal
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
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
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </IconButton>
              </Flex>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              bg="gray.800"
              color="white"
              _hover={{ bg: "gray.700" }}
              width="full"
              mt={4}
              size="lg"
            >
              Login
            </Button>

            {/* Register Redirect Link */}
            <Text fontSize="sm" color="gray.400" mt={2} textAlign="center">
              New user?{" "}
              <Link
                as={RouterLink}
                to="/register"
                color="teal.400"
                _hover={{ textDecoration: "underline", color: "blue.300" }}
              >
                Click here to register!
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Container>
  )
}

export default Login