"use client";

import { links } from "@/app/utils";
import { Maiden_Orange } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
type Length = {
  allLength: number,
  completedLength: number
}
const Header = ({ allLength, completedLength }: Length) => {
  const searchParams = useSearchParams();
  const todoFilter = searchParams.get("todos") || "all";
  return (
    <nav className="flex justify-between p-4">
      <div className="basis-1/3"></div>
      <div className="basis-1/3 flex justify-evenly items-center">
        {links.map((link) => {
          return (
            <div key={link.name}>
              <Link
                href={link.target}
                className={`cursor-pointer scale-100  hover:scale-105  ${todoFilter === link.name && "underline underline-offset-8 text-orange-500"
                  }`}
              >
                {link.name.toUpperCase()}
                <span className="px-2">({link.name === 'completed' ? completedLength : allLength})</span>
              </Link>
              {link.name === 'completed' ? '' : <span className="text-white text-xl ml-20">|</span>}
            </div>
          );
        })}
      </div>
      <div className="basis-1/3"></div>
    </nav>
  );
};

export default Header;
