import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="w-full max-w-7xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
}