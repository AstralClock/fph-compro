import { MapPin, Phone, Mail } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Vision & Mission", href: "#vision" },
  { name: "Projects", href: "#projects" },
  { name: "Our Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-charcoal text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-primary-foreground">FPH</span>
              <div className="h-0.5 w-8 bg-gold rounded-full" />
            </div>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Fortis Prima Hanami — Your strategic partner for driving
              transformation and sustainable growth in today's dynamic business
              landscape.
            </p>
            <p className="text-sm text-primary-foreground/50">
              © {new Date().getFullYear()} Fortis Prima Hanami. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Bintaro Office</p>
                  <p className="text-primary-foreground/70 text-sm">
                    Jl. Bintaro Utama Sektor 3A, Tangerang Selatan
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Medan Office</p>
                  <p className="text-primary-foreground/70 text-sm">
                    Jl. Gatot Subroto No. 123, Medan
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="text-primary-foreground/70">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="text-primary-foreground/70">info@fph.co.id</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}