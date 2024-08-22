import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Profile", "Build CV", "Find the Jobs", "Applications"];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-700 text-white p-3"
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

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="#" className="text-white">
            Build CV
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page" className="text-white">
            Find the Jobs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#">
            Applications
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-white">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} className="text-white" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "inherit"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
