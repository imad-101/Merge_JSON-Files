import Link from "next/link";

interface FooterProps {
  name: string;
}

const Footer = ({ name }: FooterProps) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-300">
      <div className="max-w-5xl mx-auto px-4 py-10 flex gap-4 flex-col sm:flex-row items-center justify-between">
        <p className="text-gray-700 text-sm">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <nav className="space-x-6">
          <Link
            href="/privacy-policy"
            className="text-gray-700 hover:text-black transition-colors text-sm"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-use"
            className="text-gray-700 hover:text-black transition-colors text-sm"
          >
            Terms of Use
          </Link>
          <Link
            href="/about-us"
            className="text-gray-700 hover:text-black transition-colors text-sm"
          >
            About Us
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
