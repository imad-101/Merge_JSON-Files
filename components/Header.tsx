import Link from "next/link";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";

interface HeaderProps {
  first: string;
  second: string;
  third: string;
  href: string;
}

const Header = ({ first, second, third, href }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={href} className="flex items-center space-x-1">
            <span className="text-black font-bold text-xl">{first}</span>
            <span className="text-black font-medium text-xl">{second}</span>
            <span className="text-gray-500 font-normal text-xl">{third}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={href}
              className="text-gray-700 hover:text-black transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/#tools"
              className="text-gray-700 hover:text-black transition-colors"
            >
              More Tools
            </Link>
            <Link href={"/contact"}>
              <Button
                variant="outline"
                className="border-gray-200 hover:bg-gray-50 text-black hover:text-black"
              >
                Contact
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="flex flex-col space-y-6 mt-10">
                <SheetClose asChild>
                  <Link
                    href={href}
                    className="text-gray-700 hover:text-black transition-colors px-2 py-1"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/blog"
                    className="text-gray-700 hover:text-black transition-colors px-2 py-1"
                  >
                    Blog
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#tools"
                    className="text-gray-700 hover:text-black transition-colors px-2 py-1"
                  >
                    More Tools
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="border-gray-200 hover:bg-gray-50 text-black hover:text-black mt-4 w-full"
                  >
                    Contact
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
