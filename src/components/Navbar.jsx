"use client";
import Link from "next/link";
import { FaBookOpenReader } from "react-icons/fa6";
import ToggleTheme from "./ToggleTheme";
import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  // console.log(user);

  const logoutBtn = async () => {
    await authClient.signOut();
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full px-31 mx-auto py-5 bg-gray-200 border-b border-sage-light">
      <div className="flex items-center gap-2">
        <FaBookOpenReader className="text-4xl text-black" />
        <h1 className="text-forest text-2xl font-bold">StudyNook</h1>
      </div>

      <ul className="flex items-center text-black font-semibold gap-2.5">
        <Link href={"/"}>
          <li>Home</li>
        </Link>
        <Link href={"/rooms"}>
          <li>Rooms</li>
        </Link>
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
