import { useEffect, useState } from "react";
import {
  Flex,
  HStack,
  Button,
  Link as ChakraLink,
  Icon,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  NotebookTabs,
  MessageSquareText,
  UserPlus,
  KeyRound,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("loggedintoken") || localStorage.getItem("token") || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setToken(localStorage.getItem("loggedintoken") || localStorage.getItem("token") || "");
    };

    syncAuthState();
    window.addEventListener("auth-change", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("auth-change", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedintoken");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken("");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/", { replace: true });
  };

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
      borderRadius="2xl"
    >
      <ChakraLink
        as={Link}
        to="/"
        display="flex"
        alignItems="center"
        _hover={{ textDecoration: "none", opacity: 0.8 }}
      >
        <Icon as={GraduationCap} boxSize={7} color="teal.400" />
      </ChakraLink>

      <HStack gap={3}>
        {!isLoggedIn && (
          <>
            <Button
              asChild
              colorPalette="ghost"
              size="sm"
              bg="gray.800"
              color="white"
              _hover={{ bg: "gray.700" }}
            >
              <Link to="/login">
                <Icon as={KeyRound} color="teal.400" mr={1} />
                Login
              </Link>
            </Button>

            <Button
              asChild
              colorPalette="ghost"
              size="sm"
              bg="gray.800"
              color="white"
              _hover={{ bg: "gray.700" }}
            >
              <Link to="/register">
                <Icon as={UserPlus} color="teal.400" mr={1} />
                Register
              </Link>
            </Button>
          </>
        )}

        {isLoggedIn && (
          <>
            <Button
              asChild
              colorPalette="ghost"
              size="sm"
              bg="gray.800"
              color="white"
              _hover={{ bg: "gray.700" }}
            >
              <Link to="/students">
                <Icon as={NotebookTabs} color="teal.400" mr={1} />
                Directory
              </Link>
            </Button>

            <Button
              asChild
              colorPalette="ghost"
              size="sm"
              bg="gray.800"
              color="white"
              _hover={{ bg: "gray.700" }}
            >
              <Link to="/feedback">
                <Icon as={MessageSquareText} color="teal.400" mr={1} />
                Feedback
              </Link>
            </Button>

            <Button
              onClick={handleLogout}
              colorPalette="ghost"
              size="sm"
              bg="gray.800"
              color="white"
              _hover={{ bg: "gray.700" }}
            >
            <Icon as={LogOut} color="teal.400" mr={1} />
              Logout
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;
