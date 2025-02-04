const Footer = () => {
  return (
    <footer className="bg-yellow-50 text-gray-600 text-center py-4">
      <hr className="mb-3" />
      <div className="container mx-auto flex-col sm:flex items-center justify-between sm:px-24">
        <p className="text-sm my-4">
          © {new Date().getFullYear()} JSON File Merger. All rights reserved.
        </p>
        <nav className="mb-2 space-x-4 my-1">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-of-use" className="hover:underline">
            Terms of Use
          </a>
          <a href="/about-us" className="hover:underline">
            About Us
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
