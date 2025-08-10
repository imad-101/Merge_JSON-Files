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
    <header className=" border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={href} className="flex items-center space-x-1 group">
            <span className="text-slate-900 font-bold text-xl md:text-2xl transition-colors group-hover:text-[#e76f51]">
              {first}
            </span>
            <span className="text-[#e76f51] font-medium text-xl md:text-2xl transition-colors group-hover:text-slate-900">
              {second}
            </span>
            <span className="text-slate-500 font-normal text-xl md:text-2xl">
              {third}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={href}
              className="text-slate-700 hover:text-green-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-slate-700 hover:text-green-600 font-medium transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/#tools"
              className="text-slate-700 hover:text-green-600 font-medium transition-colors"
            >
              More Tools
            </Link>
            <Link href={"/contact"}>
              <Button
              
                className="border-slate-200 bg-[#e76f51]  text-white shadow-sm"
              >
                Contact
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-slate-700"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white">
              <SheetTitle className="text-slate-900 text-xl font-bold pt-4">
                Menu
              </SheetTitle>
              <nav className="flex flex-col space-y-6 mt-10">
                <SheetClose asChild>
                  <Link
                    href={href}
                    className="text-slate-700 hover:text-green-600 font-medium transition-colors px-2 py-1"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/blog"
                    className="text-slate-700 hover:text-green-600 font-medium transition-colors px-2 py-1"
                  >
                    Blog
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#tools"
                    className="text-slate-700 hover:text-green-600 font-medium transition-colors px-2 py-1"
                  >
                    More Tools
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-200 bg-white hover:bg-slate-50 text-slate-800 hover:text-green-600 shadow-sm mt-4 w-full"
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
