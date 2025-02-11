import React from "react";

import Link from "next/link";
import { Button } from "./ui/button";
const Header = () => {
  return (
    <header>
      <nav className="flex justify-between items-center sm:px-24 px-6 my-5  ">
        <div className="right">
          <Link href={"/"}>
            <p className="text-2xl font-extrabold text-gray-700">
              Merge <span className="text-orange-700">JSON</span> Files
            </p>
          </Link>
        </div>
        <div className="left flex gap-5 items-center">
          <Link
            href=" /"
            className="text-gray-600 hidden sm:block hover:text-gray-700"
          >
            {" "}
            Home
          </Link>
          <Link href={"/"} className="text-gray-600">
            <Button className="px-5 bg-gray-800 hover:bg-gray-700">Blog</Button>
          </Link>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
