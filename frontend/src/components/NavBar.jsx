import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
} from "@nextui-org/react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";

const NavBar = () => {
  const { showToast, data } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const mutation = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async (data) => {
      showToast({ message: data.message, type: "success" });
      navigate("/auth", { state: { replace: true } });
    },
    onError: async (data) => {
      showToast({ message: data.message, type: "error" });
    },
  });

  const talentItems = [
    { name: "Build CV", link: "/" },
    { name: "Find Job", link: "/find-jobs" },
    { name: "Applications", link: "/applications" },
  ];
  const recruiterItems = [
    { name: "Company", link: "/company" },
    { name: "Job Post", link: "/job-posts" },
    { name: "Find Talent", link: "/find-talent" },
  ];
  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-700 text-white lg:p-3 shadow-md bg-opacity-100 backdrop-filter backdrop-blur-md"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="cursor-pointer">
            <p className="font-bold text-white sm:text-2xl">Talent</p>
            <p className="font-semibold text-yellow-400 sm:text-2xl">Find</p>
          </NavbarBrand>
        </NavbarContent>

        {data && data.role === "Talent" && (
          <>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem isActive={location.pathname === "/"}>
                <NavLink to="/" className="text-white">
                  Build CV
                </NavLink>
              </NavbarItem>
              <NavbarItem isActive={location.pathname === "/find-jobs"}>
                <NavLink
                  to="/find-jobs"
                  aria-current="page"
                  className="text-white"
                >
                  Find Job
                </NavLink>
              </NavbarItem>
              <NavbarItem isActive={location.pathname === "/applications"}>
                <NavLink className="text-white" to="/applications">
                  Applications
                </NavLink>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <Button
                  className="text-white"
                  variant="flat"
                  onClick={() => mutation.mutate()}
                >
                  Logout
                </Button>
              </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
              {talentItems.map((item, index) => (
                <NavbarMenuItem key={`${item.name}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === talentItems.length - 1
                        ? "danger"
                        : "inherit"
                    }
                    className="w-full"
                    href={item.link}
                    size="lg"
                  >
                    {item.name}
                  </Link>
                </NavbarMenuItem>
              ))}
            </NavbarMenu>
          </>
        )}

        {data && data.role === "Recruiter" && (
          <>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem isActive={location.pathname === "/company"}>
                <NavLink to="/company" className="text-white">
                  Company
                </NavLink>
              </NavbarItem>
              <NavbarItem isActive={location.pathname === "/job-posts"}>
                <NavLink
                  to="/job-posts"
                  aria-current="page"
                  className="text-white"
                >
                  Job Posts
                </NavLink>
              </NavbarItem>
              <NavbarItem isActive={location.pathname === "/find-talent"}>
                <NavLink className="text-white" to="/find-talent">
                  Find the Talent
                </NavLink>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <Button
                  as={NavLink}
                  className="text-white"
                  variant="flat"
                  onPress={() => mutation.mutate()}
                >
                  Logout
                </Button>
              </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
              {recruiterItems.map((item, index) => (
                <NavbarMenuItem key={`${item.name}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === recruiterItems.length - 1
                        ? "danger"
                        : "inherit"
                    }
                    className="w-full"
                    href={item.link}
                    size="lg"
                  >
                    {item.name}
                  </Link>
                </NavbarMenuItem>
              ))}
            </NavbarMenu>
          </>
        )}
      </Navbar>
    </>
  );
};

export default NavBar;
