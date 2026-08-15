import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col dark:bg-dark-surface" >
      <Navbar />
      <main className="w-full mx-auto max-w-7xl">{children}</main>
      <Footer />
    </div>
  );
}
