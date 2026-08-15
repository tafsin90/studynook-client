import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto pb-8 border-t border-cream py-8 bg-[#15231c] text-white w-full px-31 mx-auto">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Links Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:opacity-70 transition">Home</Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:opacity-70 transition">Rooms</Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-70 transition">About</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>
            <div className="space-y-2">
              <p>
                <Link href="mailto:info@studynook.com" className="hover:opacity-70 transition">
                  📧 info@studynook.com
                </Link>
              </p>
              <p>
                <Link href="tel:+1234567890" className="hover:opacity-70 transition">
                  📱 +1 (234) 567-890
                </Link>
              </p>
            </div>
          </div>

          {/* Social Icons Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                className="text-2xl hover:opacity-70 transition"
                title="Facebook"
              >
                f
              </Link>
              <Link
                href="https://x.com"
                className="text-2xl hover:opacity-70 transition"
                title="X"
              >
                𝕏
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-2xl hover:opacity-70 transition"
                title="LinkedIn"
              >
                in
              </Link>
              <Link
                href="https://instagram.com"
                className="text-2xl hover:opacity-70 transition"
                title="Instagram"
              >
                📷
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-cream  pt-4 text-center">
          <p className="text-sm opacity-75">
            &copy; 2026 StudyNook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
