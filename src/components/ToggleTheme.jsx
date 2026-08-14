"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa6";
import { MdWbSunny } from "react-icons/md";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className=" rounded-md px-2 py-1 hover:cursor-pointer"
    >
      {theme === "light" ? <FaMoon className="text-yellow-600 text-2xl "/>: <MdWbSunny className="text-yellow-600 text-2xl "/>}
    </button>
  );
}