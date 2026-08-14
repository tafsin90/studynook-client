import Link from "next/link";
import { FaBookOpenReader } from "react-icons/fa6";
import ToggleTheme from "./ToggleTheme";
import {Button} from "@heroui/react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-31 mx-auto py-5 bg-cream">
      <div className="flex items-center gap-2">
        <FaBookOpenReader className="text-4xl text-black" />
        <h1 className="text-forest text-2xl font-bold">StudyNook</h1>
      </div>

      <ul className="flex items-center text-black font-semibold gap-2">
        <Link href={'/'}>
          <li>Home</li>
        </Link>
        <Link href={'/Rooms'}>
          <li>Rooms</li>
        </Link>
      </ul>

      <div className="flex items-center gap-2">
        <Button variant="ghost" className={"border border-forest text-forest hover:bg-sage hover:text-white hover:cursor-pointer"}>Login</Button>
        <Button className={"bg-forest text-white hover:bg-sage hover:cursor-pointer"}>Register</Button>
        <ToggleTheme></ToggleTheme>
      </div>
    </div>
  );
};

export default Navbar;
