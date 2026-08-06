import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
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
  Spinner,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();

  // 1. Form state to store inputs
  const [formData, setFormData] = useState({
    rollno: "",
    candidate_name: "",
    course: "",
    email: "",
    marks: "",
    password: "",
  });

  // 2. UI State for toggle password visibility, loading, and status messages
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // 3. Handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 4. Handle form submission via Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    // Format payload types (convert rollno and marks to numbers)
    const payload = {
      ...formData,
      rollno: Number(formData.rollno),
      marks: Number(formData.marks),
    };

    try {
      const response = await axios.post("http://localhost:3000/students/register", payload);
      
      console.log("Registration successful:", response.data);
      setStatusMessage({ type: "success", text: "Student registered successfully!" });

      // Reset form fields
      setFormData({
        rollno: "",
        candidate_name: "",
        course: "",
        email: "",
        marks: "",
        password: "",
      });

      // Redirect to directory table or login after a brief delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      setStatusMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

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

        {/* Feedback Alert Message */}
        {statusMessage.text && (
          <Box
            mb={4}
            p={3}
            borderRadius="md"
            bg={statusMessage.type === "success" ? "green.900" : "red.900"}
            borderColor={statusMessage.type === "success" ? "green.700" : "red.700"}
            borderWidth="1px"
            color="white"
            fontSize="sm"
            textAlign="center"
          >
            {statusMessage.text}
          </Box>
        )}

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
                required
                bg="gray.800"
                borderColor="gray.700"
                _hover={{ borderColor: "gray.600" }}
                _focus={{ borderColor: "ghost.400", bg: "gray.800" }}
              />
            </Box>

            {/* Roll Number & Course */}
            <HStack w="full" gap={3}>
              <Box w="half" flex={1}>
                <Text as="label" fontSize="sm" color="gray.300" mb={2} display="block">
                  Roll No.
                </Text>
                <Input
                  type="number"
                  name="rollno"
                  placeholder="101"
                  value={formData.rollno}
                  onChange={handleChange}
                  required
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
                  required
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
                required
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
                required
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
                  required
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
                  color="teal.400"
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
              isDisabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Register"}
            </Button>

            {/* Login Redirect Link */}
            <Text fontSize="sm" color="gray.400" mt={2} textAlign="center">
              Already registered?{" "}
              <Link
                as={RouterLink}
                to="/login"
                color="teal.400"
                _hover={{ textDecoration: "underline", opacity: 0.8 }}
              >
                Click here to Login
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Register;