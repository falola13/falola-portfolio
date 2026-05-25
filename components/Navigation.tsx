"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-xl font-bold gradient-text"
              >
                FOA
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium link-hover"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download="Falola_Olufemi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium link-hover"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download="Falola_Olufemi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mx-3 px-4 py-2 text-base font-medium rounded-lg bg-primary/10 text-primary"
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      <a
        href="https://github.com/falola13"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
      >
        <Github className="w-4 h-4" />
        <span className="hidden sm:inline">View Code</span>
      </a>
    </>
  );
}
