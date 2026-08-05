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
  HStack,
  Text,
  IconButton,
  Link,
} from "@chakra-ui/react"
import { FiEye, FiEyeOff } from "react-icons/fi"

const Register = () => {
  // 1. Form state to store inputs
  const [formData, setFormData] = useState({
    rollno: "",
    candidate_name: "",
    course: "",
    email: "",
    marks: "",
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

  // 4. Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Submitted:", formData)
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
          <VStack gap={4}>
            {/* Full Name */}
            <Box w="full">
              <Text as="label" fontSize="sm" color="gray.300" mb={2} display="block">
                Full Name
              </Text>
              <Input
                type="text"
                name="candidate_name"
                placeholder="John Doe"
                value={formData.candidate_name}
                onChange={handleChange}
                bg="gray.800"
                borderColor="gray.700"
                _hover={{ borderColor: "gray.600" }}
                _focus={{ borderColor: "ghost.400", bg: "gray.800" }}
              />
            </Box>

            {/* Roll Number & Course (Placed side by side to save vertical space) */}
            <HStack w="full" gap={3}>
              <Box w="half" flex={1}>
                <Text as="label" fontSize="sm" color="gray.300" mb={2} display="block">
                  Roll No.
                </Text>
                <Input
                  type="text"
                  name="rollno"
                  placeholder="CS101"
                  value={formData.rollno}
                  onChange={handleChange}
                  bg="gray.800"
                  borderColor="gray.700"
                  _hover={{ borderColor: "gray.600" }}
                  _focus={{ borderColor: "ghost.400", bg: "gray.800" }}
                />
              </Box>

              <Box w="half" flex={1}>
                <Text as="label" fontSize="sm" color="gray.300" mb={2} display="block">
                  Course
                </Text>
                <Input
                  type="text"
                  name="course"
                  placeholder="B.Tech CS"
                  value={formData.course}
                  onChange={handleChange}
                  bg="gray.800"
                  borderColor="gray.700"
                  _hover={{ borderColor: "gray.600" }}
                  _focus={{ borderColor: "ghost.400", bg: "gray.800" }}
                />
              </Box>
            </HStack>

            {/* Email Address */}
            <Box w="full">
              <Text as="label" fontSize="sm" color="gray.300" mb={2} display="block">
                Email Address
              </Text>
              <Input
                type="email"
                name="email"
                placeholder="student@university.edu"
                value={formData.email}
                onChange={handleChange}
                bg="gray.800"
                borderColor="gray.700"
                _hover={{ borderColor: "gray.600" }}
                _focus={{ borderColor: "ghost.400", bg: "gray.800" }}
              />
            </Box>

            {/* Marks */}
            <Box w="full">
              <Text as="label" fontSize="sm" color="gray.300" mb={2} display="block">
                Marks
              </Text>
              <Input
                type="number"
                name="marks"
                placeholder="85"
                value={formData.marks}
                onChange={handleChange}
                bg="gray.800"
                borderColor="gray.700"
                _hover={{ borderColor: "gray.600" }}
                _focus={{ borderColor: "ghost.400", bg: "gray.800" }}
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
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  bg="gray.800"
                  borderColor="gray.700"
                  _hover={{ borderColor: "gray.600" }}
                  _focus={{ borderColor: "ghost.400", bg: "gray.800" }}
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
              Register
            </Button>

            {/* Login Redirect Link */}
            <Text fontSize="sm" color="gray.400" mt={2} textAlign="center">
              Already registered?{" "}
              <Link
                as={RouterLink}
                to="/login"
                color="ghost.400"
                _hover={{ textDecoration: "underline", opacity: 0.8 }}
              >
                Click here to Login
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Container>
  )
}

export default Register