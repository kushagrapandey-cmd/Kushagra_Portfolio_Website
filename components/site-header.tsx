"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { ExternalLink } from "./external-link";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  ["Overview", "/"],
  ["Experience", "/experience"],
  ["Cloud Journey", "/cloud"],
  ["Engineering Work", "/work"],
  ["About", "/about"],
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Kushagra Pandey home">
          <span className="brand-mark" aria-hidden="true">{profile.shortName}</span>
          <span className="brand-copy">
            <strong>{profile.name}</strong>
            <small>Engineering portfolio</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={isActivePath(pathname, href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <Link className="button button-quiet desktop-action" href="/resume">Resume</Link>
          <ExternalLink className="button button-primary desktop-action" href={profile.github}>GitHub</ExternalLink>
          <div className="mobile-menu" ref={menuRef}>
            <button
              ref={menuButtonRef}
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-primary-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
            {menuOpen ? (
              <nav id="mobile-primary-navigation" className="mobile-menu-panel" aria-label="Mobile navigation">
                {nav.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    aria-current={isActivePath(pathname, href) ? "page" : undefined}
                  >
                    {label}
                  </Link>
                ))}
                <Link href="/resume" aria-current={pathname === "/resume" ? "page" : undefined}>Resume</Link>
                <ExternalLink href={profile.github}>GitHub</ExternalLink>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
