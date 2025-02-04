import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
const Header = () => {
  return (
    <header>
      <nav className="flex justify-between items-center sm:px-24 px-6 my-5  ">
        <div className="right">
          <Link href={"/"}>
            {" "}
            <Image src={"/logo.png"} alt="Logo" width={200} height={30}></Image>
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
          <Link href={"/blog"} className="text-gray-600">
            <Button className="px-5 bg-gray-700 hover:bg-gray-800">Blog</Button>
          </Link>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
