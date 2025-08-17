"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CoupleImage from "../assets/couple.jpg";
import VideoLogo from "../assets/videoLogo.png";
import memoji from "../assets/memoji-smile.png";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Contact } from "lucide-react";

const navigation = [
  { name: "Video Upload", href: "#" },
  { name: "Video Stream", href: "#" },
];

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8 "
        >
          <div className="flex lg:flex-1 ">
            <Link to="/" className="-m-1.5 p-1.5">
              <img
                src={VideoLogo}
                alt="Video Logo "
                className="h-17 w-auto 
        mix-blend-screen opacity-90 drop-shadow-2xl
        transition-all duration-1000
          rounded-full sm:h-13"
              />
            </Link>
          </div>
          {/* Mobile Menu Button */}
        <div className=" flex gap-5 flex-row-reverse">
            <div className="flex lg:hidden gap-2  ">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200" >
              <Bars3Icon
                aria-hidden="true"
                className="h-7 w-7 cursor-pointer"/>
            </button>
          </div>
          <div className="mt-1.5">
            <UserButton
            />
          </div>
        </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-50 overflow-y-auto bg-gray-900 p-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  aria-hidden="true"
                  className="h-6 w-6 cursor-pointer"
                />
              </button>
            </div>

            <div className="mt-6 space-y-2 ">
              <SignedIn>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                  >
                    {item.name}
                  </a>
                ))}
              </SignedIn>
              <div className="flex justify-center items-center flex-col gap-3">
                <SignedOut>
                  <SignInButton>
                    <button className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 cursor-pointer">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 cursor-pointer">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
              </div>

              <div className="ml-3">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between flex-1 px-6 lg:px-20 pt-28 lg:pt-40 gap-8">
        {/* Left Content */}
        <div className="text-center lg:text-left max-w-lg flex-[0.4]">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Watch, Upload, Repeat.
          </h1>
          <p className="mt-6 text-lg text-gray-400 sm:text-xl">
            Discover videos from creators worldwide or share your own with the
            community — all in one place.
          </p>

          <SignedIn>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/stream"
                className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
              >
                Start Watching
              </Link>
              <Link
                to="/upload"
                className="rounded-md border border-gray-400 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Upload Video
              </Link>
            </div>
          </SignedIn>

          {/* clerk  */}
          <SignedOut>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ">
            
              <SignInButton>
                <button className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end flex-[0.6]">
          <img
            src={CoupleImage}
            alt="Blended Couple"
            className="
        w-3/4 sm:w-4/5 md:w-[550px] lg:w-[750px] xl:w-[950px]
        h-auto
        mix-blend-screen opacity-90 drop-shadow-2xl
        transition-all duration-1000
         animate-float"
          />
        </div>
      </section>
    <div className="flex justify-center mb-4">
  <Link
    to="/contact"
    className="flex items-center gap-2 px-4 text-sm font-semibold text-white rounded-lg shadow-md transition-all duration-300 hover:scale-105 "
  >
    <img src={memoji} alt="Computer-memoji" width={50}
    />
<p>Contact Dev</p>
  </Link>
</div>

    </div>
  );
}
