"use client";

import React, { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { openSignupModal, openLoginModal } from "@/store/slices/modalSlice";
import board from "../../assets/board.svg";
import logo from "../../assets/logo.svg";
import Link from "next/link";

type ImageLike = string | StaticImageData;

export interface NavLink {
  label: string;
  href?: string;
}

interface NavbarProps {
  navLinks?: NavLink[];
  showDemoBadge?: boolean;
  snow?: ImageLike;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  navLinks = [
    { label: "Demo Class", href: "#" },
    { label: "Courses", href: "/categories" },
    { label: "Day Challenge", href: "#" },
    { label: "About Us", href: "/about" },
  ],
  showDemoBadge = true,
  // snow,
  className = "",
}) => {
  const dispatch = useAppDispatch();

  const handleSignupClick = () => dispatch(openSignupModal());
  const handleLoginClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    dispatch(openLoginModal());
  };



  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Main Navigation Bar */}
        <nav
          className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-3 bg-[#f4fafc]"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Company Logo"
                width={120}
                height={60}
                className="cursor-pointer"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href ?? "#"}
                className="text-black text-sm flex items-center space-x-2"
              >
                {link.label === "Demo Class" && showDemoBadge && (
                  <span className="inline-block bg-[#C3F9E5] text-green text-[10px] font-normal px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button
              type="button"
              className="text-[#1CA672] border border-[#1CA672] font-normal px-3 py-1 rounded-full text-[14px] md:px-4 md:text-[16px] cursor-pointer"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              type="button"
              className="text-white bg-black font-normal px-3 py-1 rounded-full transition-colors text-[14px] md:px-4 md:text-[16px] cursor-pointer"
              onClick={handleSignupClick}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center" ref={menuRef}>
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((s) => !s)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={
                    menuOpen ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"
                  }
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-4 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-3 z-50">
                <div className="flex flex-col px-3 space-y-2">
                  {navLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href ?? "#"}
                      className="text-black text-sm py-1"
                    >
                      {link.label}
                    </a>
                  ))}

                  <div className="border-t pt-2">
                    <button
                      className="w-full text-black border border-[#1CA672] font-normal mb-2 px-3 py-1 rounded-full text-[14px] md:text-[16px]"
                      onClick={handleLoginClick}
                    >
                      Login
                    </button>
                    <button
                      className="w-full text-white bg-black font-normal px-3 py-1 rounded-full text-[14px] md:px-4 md:text-[16px]"
                      onClick={handleSignupClick}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Snow drip effect below navbar */}
        <div
          className="absolute left-0 right-0 w-full h-12 sm:h-16 md:h-36 bg-cover bg-center z-40 pointer-events-none lg:-mt-[1.5]"
          style={{
            backgroundImage: `url(${board.src})`,
            backgroundRepeat: "repeat-x",
            top: '100%',
            marginTop: '-1.5px',
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
          aria-hidden
        />
      </div>
    </>
  );
};

export default Navbar;