"use client";

import logoImage from "@/public/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { LuLayoutDashboard, LuUser } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserInfo, logout } from "@/services/authService";
import { useEffect, useState } from "react";

const NavMenu = () => {
  const routerPath = usePathname();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(getUserInfo());
  }, []);

  const logOut = () => {
    logout();
    router.refresh();
  };

  return (
    <header className="main-header flex justify-between items-center h-[80px] px-12 z-50 relative">
      <Link href="/">
        <Image src={logoImage} priority alt="logo" width={150} height={120} />
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
            {!userInfo ? (
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

        {userInfo?.role === "admin" ||
          (userInfo?.role === "super_admin" && (
            <Link href="/admin">
              <LuLayoutDashboard className="text-[19px]" />
            </Link>
          ))}

        {userInfo?.role !== "admin" && userInfo?.role !== "super_admin" && (
          <>
            <CiHeart className="text-xl cursor-pointer" />
            <IoCartOutline className="text-[18px] cursor-pointer" />
          </>
        )}
      </div>
    </header>
  );
};

export default NavMenu;
