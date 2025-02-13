interface FooterProps {
  name: string;
}
const Footer = ({ name }: FooterProps) => {
  return (
    <footer className="bg-yellow-50 text-gray-600 text-center py-4">
      <hr className="mb-3" />
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between sm:px-24">
        <p className="text-sm my-4">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <nav className="mb-2 space-x-4 my-1">
          <a
            href="https://merge-json-files.com/privacy-policy"
            className="hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="https://merge-json-files.com/terms-of-use"
            className="hover:underline"
          >
            Terms of Use
          </a>
          <a
            href="https://merge-json-files.com/about-us"
            className="hover:underline"
          >
            About Us
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
