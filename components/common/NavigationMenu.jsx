"use client";

import logoImage from "@/public/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getUserInfo, logout } from "@/services/authService";

export default function NavMenu() {
  const routerPath = usePathname();
  const router = useRouter();

  const isUserLoggedIn = getUserInfo()?.user_id ? true : false;

  const logOut = () => {
    logout();
    router.refresh();
  };

  return (
    <header className="main-header flex justify-between items-center h-[80px] px-12 z-50 relative">
      <Link href="/">
        <Image src={logoImage} alt="logo" width={150} height={120} />
      </Link>
      <div className="flex gap-x-6">
        <Link
          href="/"
          className={`font-medium hover:text-red-400 ${
            routerPath === "/" && "active-nav"
          }`}
        >
          Home
        </Link>
        <Link
          href="/shop"
          className={`font-medium hover:text-red-400 ${
            routerPath === "/shop" && "active-nav"
          }`}
        >
          Shop
        </Link>
      </div>
      <div className="flex gap-x-1.5">
        <IoIosSearch className="text-xl cursor-pointer" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <LuUser className="text-[17px]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {!isUserLoggedIn ? (
              <>
                <DropdownMenuItem className="cursor-pointer hover:text-red-400">
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:text-red-400">
                  <Link href="/register">Sign up</Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  className="cursor-pointer hover:text-red-400"
                  onClick={logOut}
                >
                  Logout
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <CiHeart className="text-xl cursor-pointer" />
        <IoCartOutline className="text-[18px] cursor-pointer" />
      </div>
    </header>
  );
}
