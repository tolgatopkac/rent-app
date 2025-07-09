import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `{NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-gray-700 text-white">
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/"
            className="cursor-pointer hover:text-gray-300"
            scroll={false}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Rental App"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-xl font-bold ">
                Rent
                <span className="text-red-500 font-light hover:text-gray-300">
                  Full
                </span>
              </div>
            </div>
          </Link>
        </div>
        <p className="text-gray-200 hidden md:block">
          Discover your perfect rental apartment with our advance search
        </p>
        <div className="flex items-center gap-5">
          <Link href="/signin">
            <Button
              variant="outline"
              className="text-white border-white bg-transparent hover:bg-white hover:text-gray-700 rounded-lg cursor-pointer"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="secondary"
              className="text-white border-white bg-red-600 hover:bg-white hover:text-gray-700 rounded-lg cursor-pointer"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
