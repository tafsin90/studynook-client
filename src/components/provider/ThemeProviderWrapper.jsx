"use client"

import { ThemeProvider } from "next-themes"


const ThemeProviderWrapper = ({ children }) => {
  return (
    <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem={false} >
      {children}
    </ThemeProvider>
  )
}

export default ThemeProviderWrapper





// // components/provider/ThemeProviderWrapper.jsx
// "use client";
// import { ThemeProvider } from "next-themes";

// if (typeof window !== "undefined") {
//   const originalError = console.error;
//   console.error = (...args) => {
//     if (
//       typeof args[0] === "string" &&
//       args[0].includes("Encountered a script tag while rendering React component")
//     ) {
//       return;
//     }
//     originalError(...args);
//   };
// }

// export default function ThemeProviderWrapper({ children }) {
//   return (
//     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//       {children}
//     </ThemeProvider>
//   );
// }