import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Input,
  Textarea,
  Button,
  Field,
} from '@chakra-ui/react'

const Feedback = () => {
  const [formData, setFormData] = useState({
    email: '',
    course: '',
    feedback: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Process feedback submission logic here (e.g., API call)
    console.log('Feedback submitted:', formData)
    
    setIsSubmitted(true)
    setFormData({ email: '', course: '', feedback: '' })
  }

  return (
    <Container maxW="lg" py={12}>
      <Box
        bg="gray.900"
        color="white"
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        border="1px solid"
        borderColor="gray.800"
      >
        <VStack gap={2} align="stretch" mb={6}>
          <Heading size="xl" textAlign="center">
            Course Feedback
          </Heading>
          <Text color="gray.400" textAlign="center" fontSize="sm">
            We value your thoughts! Let us know how we can improve.
          </Text>
        </VStack>

        {isSubmitted ? (
          <VStack gap={4} py={6} textAlign="center">
            <Text color="green.400" fontSize="lg" fontWeight="medium">
              Thank you for your feedback!
            </Text>
            <Button
              size="sm"
              variant="ghost"
              color="gray.300"
              _hover={{ bg: 'gray.800', color: 'white' }}
              onClick={() => setIsSubmitted(false)}
            >
              Submit another response
            </Button>
          </VStack>
        ) : (
          <form onSubmit={handleSubmit}>
            <VStack gap={5}>
              {/* Email Field */}
              <Field.Root required>
                <Field.Label color="gray.300" fontSize="sm">
                  Email Address
                </Field.Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  bg="gray.800"
                  borderColor="gray.700"
                  _focus={{ borderColor: 'blue.500' }}
                />
              </Field.Root>

              {/* Course Field */}
              <Field.Root required>
                <Field.Label color="gray.300" fontSize="sm">
                  Course
                </Field.Label>
                <Input
                  type="text"
                  name="course"
                  placeholder="e.g. Computer Science"
                  value={formData.course}
                  onChange={handleChange}
                  bg="gray.800"
                  borderColor="gray.700"
                  _focus={{ borderColor: 'blue.500' }}
                />
              </Field.Root>

              {/* Feedback Textarea */}
              <Field.Root required>
                <Field.Label color="gray.300" fontSize="sm">
                  Feedback
                </Field.Label>
                <Textarea
                  name="feedback"
                  placeholder="Write your feedback here..."
                  rows={4}
                  value={formData.feedback}
                  onChange={handleChange}
                  bg="gray.800"
                  borderColor="gray.700"
                  _focus={{ borderColor: 'blue.500' }}
                />
              </Field.Root>

              {/* Submit Button */}
              <Button
                type="submit"
                w="full"
                bg="gray.700"
                color="white"
                _hover={{ bg: 'gray.600' }}
                size="lg"
                mt={2}
              >
                Submit Feedback
              </Button>
            </VStack>
          </form>
        )}
      </Box>
    </Container>
  )
}

export default Feedback