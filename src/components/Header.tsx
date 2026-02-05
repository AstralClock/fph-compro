import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Vision & Mission", href: "#vision" },
  { name: "Projects", href: "#projects" },
  { name: "Our Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-3xl font-bold text-primary">FPH</span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full" />
            </div>
            <span className={`hidden sm:block text-sm font-medium transition-colors ${
              isScrolled ? "text-foreground" : "text-primary-foreground"
            }`}>
              Fortis Prima Hanami
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className={isScrolled ? "" : "text-primary-foreground"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-lg font-medium text-foreground hover:text-primary text-left transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection("#contact")}
                  className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Get in Touch
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}