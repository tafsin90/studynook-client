"use client";
import Link from "next/link";
import { FaBookOpenReader } from "react-icons/fa6";
import ToggleTheme from "./ToggleTheme";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { Bars } from "@gravity-ui/icons";

const Navbar = () => {
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  // console.log(user);

  const logoutBtn = async () => {
    await authClient.signOut();
  };

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Rooms",
      href: "/rooms",
    },
  ];

  if (user) {
    navLinks.push(
      {
        name: "My Listings",
        href: "/my-listings",
      },
      {
        name: "My Bookings",
        href: "/my-bookings",
      },
      {
        name: "Add Room",
        href: "/add-room",
      },
    );
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full px-31 mx-auto py-5 bg-gray-200 border-b border-sage-light">
      <div className="flex items-center gap-2">
        <FaBookOpenReader className="text-4xl text-black" />
        <h1 className="text-forest text-2xl font-bold">StudyNook</h1>
      </div>

      <ul className="flex items-center text-black font-semibold gap-5">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  isActive
                    ? "text-forest border-b-2 border-forest"
                    : "text-black"
                }
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {isPending ? (
        <span>Loading...</span>
      ) : user ? (
        <div className="flex items-center gap-2">
          <Avatar className="border border-2 border-gray-300">
            <Avatar.Image
              alt="user.name"
              src={
                user.image ? user.image : user.name?.slice(0, 2).toUpperCase()
              }
            />
            <Avatar.Fallback>
              {user.name?.slice(0, 2).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>

          <h1 className="text-xl font-semibold text-green-950">{user.name}</h1>

          <Dropdown>
            <Button
              isIconOnly
              aria-label="Menu"
              variant="secondary"
              className="border-0"
            >
              <Bars className="size-5 text-black"/>
            </Button>

            <Dropdown.Popover className="w-auto min-w-0 p-1">
              <Dropdown.Menu
                className="min-w-0"
                onAction={(key) => console.log(`Selected: ${key}`)}
              >
                <Dropdown.Item
                  id="profile"
                  textValue={`${user.name}'s profile`}
                  className="whitespace-nowrap"
                >
                  <Link href="/profile" className="block w-full font-semibold">
                    {user.name}'s profile
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item
                  id="my-listings"
                  textValue="My Listings"
                  className="whitespace-nowrap"
                >
                  <Link href="/my-listings" className="block w-full">
                    My Listings
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item
                  id="my-bookings"
                  textValue="My Bookings"
                  className="whitespace-nowrap"
                >
                  <Link href="/my-bookings" className="block w-full">
                    My Bookings
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item
                  id="logout"
                  textValue="Logout"
                  variant="danger"
                  className="p-0"
                >
                  <Button
                    className="w-full rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-500"
                    onPress={logoutBtn}
                  >
                    Logout
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
          {/*
            <Link href={"/"}>
                    <Button
                      className={
                        "bg-red-600 text-white hover:bg-red-500 hover:cursor-pointer"
                      }
                      onClick={logoutBtn}
                    >
                      Logout
                    </Button>
                  </Link>
            */}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href={"/login"}>
            <Button
              variant="ghost"
              className={
                "border border-forest text-forest hover:bg-sage hover:text-white hover:cursor-pointer"
              }
            >
              Login
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button
              className={
                "bg-forest text-white hover:bg-sage hover:cursor-pointer"
              }
            >
              Register
            </Button>
          </Link>
          <ToggleTheme></ToggleTheme>
        </div>
      )}
    </div>
  );
};

export default Navbar;
