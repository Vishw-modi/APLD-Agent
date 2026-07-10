"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center group">
          <div className="relative h-16 w-60 transition-transform hover:opacity-80">
            <Image
              src="/Tredence_KMK_Logo-removebg-preview.png"
              alt="Tredence KMK Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <span className="hidden sm:block text-sm font-medium text-text-secondary">
            APLD Analytics Pipeline
          </span>
          <div className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
            U
          </div>
        </nav>
      </div>
    </header>
  );
}
