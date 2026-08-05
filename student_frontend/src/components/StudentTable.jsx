import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Heading,
  Table,
  HStack,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const StudentTable = () => {
  const [students, setStudents] = useState([]);

  // Track active row states using MongoDB _id
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  // 1. GET Request on component load
  useEffect(() => {
    axios
      .get("http://localhost:3000/students/")
      .then((response) => {
        setStudents(response.data);
        console.log("Students loaded:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Start Inline Editing
  const handleEditClick = (student) => {
    setEditingId(student._id);
    setDeletingId(null); // Cancel any active delete prompts
    setEditFormData({ ...student });
  };

  // Handle changes in table row inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "rollno" || name === "marks" ? Number(value) : value,
    }));
  };

  // 2. PUT Request using _id
  const handleSaveEdit = () => {
    axios
      .put(`http://localhost:3000/students/${editingId}`, editFormData)
      .then((response) => {
        const updatedStudent = response.data.student;

        setStudents(
          students.map((student) =>
            student._id === editingId ? updatedStudent : student
          )
        );
        setEditingId(null);
        setEditFormData(null);
        console.log("Student updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  // Cancel Inline Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  // Delete Prompt Triggers
  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setEditingId(null); // Cancel any active edits
  };

  // 3. DELETE Request using _id
  const handleConfirmDelete = (id) => {
    axios
      .delete(`http://localhost:3000/students/${id}`)
      .then((response) => {
        setStudents(students.filter((student) => student._id !== id));
        setDeletingId(null);
        console.log("Student deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  // Cancel Delete
  const handleCancelDelete = () => {
    setDeletingId(null);
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Box
        bg="gray.900"
        color="white"
        p={6}
        borderRadius="xl"
        boxShadow="2xl"
        border="1px solid"
        borderColor="gray.800"
      >
        <Heading size="lg" mb={6}>
          Student Directory
        </Heading>

        <Table.Root variant="line" size="md">
          <Table.Header>
            <Table.Row borderColor="gray.800">
              <Table.ColumnHeader color="gray.400" w="12%">
                Roll No
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" w="22%">
                Candidate Name
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" w="22%">
                Course
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" w="24%">
                Email
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" w="10%">
                Marks
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textAlign="right" w="10%">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {students.map((student) => {
              const isEditing = editingId === student._id;
              const isDeleting = deletingId === student._id;

              return (
                <Table.Row
                  key={student._id}
                  borderColor="gray.800"
                  _hover={{ bg: isEditing ? "gray.900" : "gray.800" }}
                >
                  {/* Roll No (Usually read-only primary key identifier) */}
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        size="sm"
                        name="rollno"
                        type="number"
                        value={editFormData.rollno}
                        onChange={handleInputChange}
                        bg="gray.800"
                        borderColor="gray.700"
                        _focus={{ borderColor: "ghost.400" }}
                      />
                    ) : (
                      student.rollno
                    )}
                  </Table.Cell>

                  {/* Candidate Name */}
                  <Table.Cell fontWeight="medium">
                    {isEditing ? (
                      <Input
                        size="sm"
                        name="candidate_name"
                        value={editFormData.candidate_name}
                        onChange={handleInputChange}
                        bg="gray.800"
                        borderColor="gray.700"
                        _focus={{ borderColor: "ghost.400" }}
                      />
                    ) : (
                      student.candidate_name
                    )}
                  </Table.Cell>

                  {/* Course */}
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        size="sm"
                        name="course"
                        value={editFormData.course}
                        onChange={handleInputChange}
                        bg="gray.800"
                        borderColor="gray.700"
                        _focus={{ borderColor: "ghost.400" }}
                      />
                    ) : (
                      student.course
                    )}
                  </Table.Cell>

                  {/* Email */}
                  <Table.Cell color={isEditing ? "white" : "gray.400"}>
                    {isEditing ? (
                      <Input
                        size="sm"
                        name="email"
                        type="email"
                        value={editFormData.email}
                        onChange={handleInputChange}
                        bg="gray.800"
                        borderColor="gray.700"
                        _focus={{ borderColor: "ghost.400" }}
                      />
                    ) : (
                      student.email
                    )}
                  </Table.Cell>

                  {/* Marks */}
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        size="sm"
                        name="marks"
                        type="number"
                        value={editFormData.marks}
                        onChange={handleInputChange}
                        bg="gray.800"
                        borderColor="gray.700"
                        _focus={{ borderColor: "ghost.400" }}
                      />
                    ) : (
                      student.marks
                    )}
                  </Table.Cell>

                  {/* Actions Column */}
                  <Table.Cell textAlign="right">
                    <HStack justify="flex-end" gap={1}>
                      {/* 1. EDIT MODE BUTTONS */}
                      {isEditing && (
                        <>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            color="green.400"
                            _hover={{ bg: "green.900", color: "green.200" }}
                            onClick={handleSaveEdit}
                            aria-label="Save changes"
                          >
                            <FiCheck />
                          </IconButton>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            color="gray.400"
                            _hover={{ bg: "gray.700", color: "white" }}
                            onClick={handleCancelEdit}
                            aria-label="Cancel editing"
                          >
                            <FiX />
                          </IconButton>
                        </>
                      )}

                      {/* 2. DELETE CONFIRMATION BUTTONS */}
                      {isDeleting && (
                        <>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            color="red.400"
                            _hover={{ bg: "red.900", color: "red.200" }}
                            onClick={() => handleConfirmDelete(student._id)}
                            aria-label="Confirm delete"
                          >
                            <FiCheck />
                          </IconButton>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            color="gray.400"
                            _hover={{ bg: "gray.700", color: "white" }}
                            onClick={handleCancelDelete}
                            aria-label="Cancel delete"
                          >
                            <FiX />
                          </IconButton>
                        </>
                      )}

                      {/* 3. DEFAULT BUTTONS */}
                      {!isEditing && !isDeleting && (
                        <>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            color="gray.300"
                            _hover={{ bg: "gray.700", color: "white" }}
                            onClick={() => handleEditClick(student)}
                            aria-label="Edit student"
                          >
                            <FiEdit2 />
                          </IconButton>

                          <IconButton
                            size="sm"
                            variant="ghost"
                            color="red.400"
                            _hover={{ bg: "red.900", color: "red.200" }}
                            onClick={() => handleDeleteClick(student._id)}
                            aria-label="Delete student"
                          >
                            <FiTrash2 />
                          </IconButton>
                        </>
                      )}
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Box>
    </Container>
  );
};

export default StudentTable;