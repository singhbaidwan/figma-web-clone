"use client";
import React, { memo } from "react";
import Image from "next/image";
import LiveAvatars from "./users/LiveAvatar";
import { NavbarProps } from "@/types/type";
const Navbar = ({ activeElement }: NavbarProps) => {
  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white">
      <Image
        src={"/app/favicon.ico"}
        alt="FigPro Logo"
        width={58}
        height={20}
      />
      <LiveAvatars />
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
